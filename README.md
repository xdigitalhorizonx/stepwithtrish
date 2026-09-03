# Step With Trish — Flooring & Design

Spec homepage for **Step With Trish — Flooring & Design**, built by [Digital Horizon](https://digitalhorizon.dev).
Static, dependency-free, self-hosted fonts, responsive images. Deploy the repo root as-is (Vercel, Netlify, GitHub Pages).

## Layout
- `index.html` — the site (single page). All CSS/JS inline; no build step, no CDN, no external requests.
- `assets/fonts/` — Clash Display 500/600 + General Sans 400/500/600 (Fontshare, ITF Free Font Licence), woff2 only.
- `assets/img/` — WebP imagery with responsive variants (`<picture>` portrait hero for phones; `srcset` 800w/1200w/1600w/3200w).
- `standalone/step-with-trish.html` — the same page as one self-contained file (fonts + images inlined, ~2.4 MB) for previews.

## Design notes
- Palette from the client's logo: chalk `#F6F5F1` ground, walnut `#4A2F21` ink, copper `#C4713F` accent (text token `#9A4E26`, AA).
- Hero: floating oak staircase revealed plank by plank on load, headline hanging over the frame edge, copper brush stroke under the accent word.
- Sections: statement + sample table → expanding material accordion (hover / tap / keyboard) → the three-step process as a staircase → herringbone feature band → consult form.
- Motion honors `prefers-reduced-motion`; everything resolves visible without JavaScript.
- Easter egg: type `step` (or the Konami code) and every pointer move leaves a footprint. Esc stops it.

## Before publishing (client data — nothing here is invented)
1. Drop the real logo into the header/footer `.brand` slots (a type lockup stands in).
2. Add phone, studio address, email, hours and service area.
3. Wire the consult form to an endpoint or inbox — it currently tells the visitor it is not connected yet.
4. Legal pages, then the SEO pass (title/meta/canonical/Open Graph + JSON-LD).

## Verified
0 px horizontal overflow at 1440 / 1024 / 768 / 390 · fonts and images proven in-browser · zero console errors · device emulation
(iPhone 13, small Android, landscape): tap-to-open accordion, menu sheet, anchors clear of the fixed header, all touch targets ≥ 44 px.
