# Step With Trish — Flooring & Design

Website for **Step With Trish — Flooring & Design**, an upscale flooring and interior design studio for Reno, Sparks and
Northern Nevada, built in memory of Trish. Built by [Digital Horizon](https://digitalhorizon.dev).

Static, dependency-free: self-hosted fonts, responsive WebP images, one JSON-LD `@graph` per page, `sitemap.xml` and
`robots.txt`. Deploy the repo root as-is (Vercel, Netlify, GitHub Pages). `vercel.json` enforces trailing slashes so
every URL matches its canonical.

## Pages
| URL | Page |
|---|---|
| `/` | Home |
| `/flooring/` | Flooring & services hub |
| `/hardwood-flooring/` · `/luxury-vinyl-plank/` · `/tile-and-stone/` · `/carpet-and-rugs/` | Material pages |
| `/interior-design/` · `/flooring-installation/` | Service pages |
| `/service-area/` | Reno, Sparks & Northern Nevada (one page — no per-city doorway pages until real local proof exists) |
| `/about/` | Our story (the client's copy, verbatim) |
| `/contact/` | Book a design consult |
| `/blog/` + four posts | Reno–Sparks flooring & design journal |
| `/privacy/` · `/404.html` | Legal / not found |

## How it is built
The site is generated from `content/*.json` by a small Python generator kept in the agency workspace (`site-v1/build_site.py`):
shared design system from the home page, one `@graph` per page (LocalBusiness · WebSite · WebPage · BreadcrumbList · Service /
FAQPage / BlogPosting / AboutPage / ContactPage), FAQ schema produced from the same data as the visible FAQ so they can never
drift, and a build gate (dead links, tokens, schema parse, title/meta lengths, inbound links, sitemap parity). This repo holds the
**output** (`dist/` contents at the root). Edit the JSON and rebuild rather than editing HTML by hand.

## Before publishing (client data — nothing here is invented)
0. **Name check:** the logo reads "Step **With** Trish", the About copy reads "Step **For** Trish" — confirm, then change one config value and rebuild.
1. **Domain:** canonicals and schema point at `https://stepwithtrish.com/` — confirm the client owns it (it was registered as of 2026-09-08); `stepfortrish.com` and `stepwithtrishflooring.com` were available. Until the real domain is attached, `vercel.json` sends `X-Robots-Tag: noindex` on any `*.vercel.app` host so the preview hostname is never indexed; the header does not apply to the custom domain.
2. Real logo file into the header/footer lockup; phone, address, hours, email; Google Business Profile → then add `telephone`, `address`, `geo`, `openingHoursSpecification`, `sameAs` to the LocalBusiness node (one config change).
3. Wire the consult form (it says on submit that it is not connected yet).
4. Contractor licence: nothing on the site claims one. Once the studio or its installer of record holds NSCB C-16 / C-20, add the number to the footer and installation page.
5. Submit `sitemap.xml` in Search Console after launch; re-run keyword research with volumes (OpenSEO / Ahrefs) before locking page priorities.

## Verified
Real Edge (Playwright) over HTTP at 1440 / 768 / 390 with phone emulation on every page: no horizontal overflow, fonts proven,
images decode, single H1 and clean heading order, zero console errors, zero external requests, touch targets ≥ 44 px; build gate
clean; JSON-LD parses on every page with FAQ parity byte-for-byte.
