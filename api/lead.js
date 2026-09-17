/* Consult-form handler. Posts the lead to the studio inbox via Resend.
   Secrets live in Vercel env vars, never in the repo. */

const TO = (process.env.LEAD_TO || 'stepwithtrish@gmail.com').split(',').map(s => s.trim()).filter(Boolean);
const FROM = process.env.LEAD_FROM || 'Step With Trish <onboarding@resend.dev>';

const LIMITS = { name: 120, email: 200, phone: 40, material: 40, space: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/* Strips CR/LF so nothing a visitor types can forge a mail header. */
var clean = function (v, max) {
  return String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  var body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};

  /* Honeypot: a real person never fills a field they cannot see. Answer 200 so
     bots get no signal about why nothing happened. */
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  var name = clean(body.name, LIMITS.name);
  var email = clean(body.email, LIMITS.email);
  var phone = clean(body.phone, LIMITS.phone);
  var material = clean(body.material, LIMITS.material);
  var space = String(body.space == null ? '' : body.space).trim().slice(0, LIMITS.space);
  var page = clean(body.page, 300) || clean(req.headers.referer, 300);

  if (!name || !email) return res.status(400).json({ ok: false, error: 'Add your name and a working email so we can reach you.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: 'That email address does not look right — mind checking it?' });

  var key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'We could not send that just now. Please call or email us directly.' });
  }

  var when = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'short'
  });

  var rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Leaning toward', material || '—'],
    ['Page', page || '—'],
    ['Received', when + ' (Pacific)']
  ];

  var text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n')
    + '\n\nAbout the space:\n' + (space || '(nothing written)')
    + '\n\nReply straight to this email to answer ' + name + '.';

  var html = '<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:620px;color:#1c1917">'
    + '<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#a8a29e">New consult request</p>'
    + '<h2 style="margin:0 0 20px;font-size:22px;color:#9f1239">' + esc(name) + '</h2>'
    + '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:15px">'
    + rows.map(function (r) {
        var v = r[0] === 'Email'
          ? '<a href="mailto:' + esc(r[1]) + '" style="color:#9f1239">' + esc(r[1]) + '</a>'
          : (r[0] === 'Phone' && r[1] !== '—'
              ? '<a href="tel:' + esc(r[1].replace(/[^\d+]/g, '')) + '" style="color:#9f1239">' + esc(r[1]) + '</a>'
              : esc(r[1]));
        return '<tr>'
          + '<td style="padding:8px 14px 8px 0;color:#78716c;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f5f5f4">' + esc(r[0]) + '</td>'
          + '<td style="padding:8px 0;vertical-align:top;border-bottom:1px solid #f5f5f4">' + v + '</td>'
          + '</tr>';
      }).join('')
    + '</table>'
    + '<p style="margin:22px 0 6px;color:#78716c;font-size:13px">About the space</p>'
    + '<div style="white-space:pre-wrap;background:#faf9f8;border-left:3px solid #9f1239;padding:14px 16px;border-radius:0 6px 6px 0;font-size:15px;line-height:1.6">'
    + (space ? esc(space) : '<em style="color:#a8a29e">Nothing written.</em>') + '</div>'
    + '<p style="margin:22px 0 0;color:#a8a29e;font-size:13px">Reply to this email to answer ' + esc(name) + ' directly.</p>'
    + '</div>';

  try {
    var r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email,
        subject: 'New consult request — ' + name + (material ? ' (' + material + ')' : ''),
        text: text,
        html: html
      })
    });

    if (!r.ok) {
      console.error('Resend rejected the lead:', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'We could not send that just now. Please call or email us directly.' });
    }

    var sent = await r.json();
    console.log('Lead sent', sent.id, 'from page', page);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead send threw:', err);
    return res.status(502).json({ ok: false, error: 'We could not send that just now. Please call or email us directly.' });
  }
};
