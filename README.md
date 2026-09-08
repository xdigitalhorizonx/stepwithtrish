# Step With Trish — Flooring & Design

Spec homepage for **Step With Trish — Flooring & Design**, built by [Digital Horizon](https://digitalhorizon.dev).
Built in memory of Trish — upscale flooring and thoughtful design for Northern Nevada. Static, dependency-free, self-hosted fonts,
responsive images. Deploy the repo root as-is (Vercel, Netlify, GitHub Pages).

## Layout
- `index.html` — the site (single page). All CSS/JS inline; no build step, no CDN, no external requests.
- `assets/fonts/` — Clash Display 500/600 + General Sans 400/500/600 + Sentient Italic 400 (Fontshare, ITF Free Font Licence), woff2 only.
- `assets/img/` — WebP imagery with responsive variants (`<picture>` portrait hero for phones; `srcset` 800w/1200w/1600w/3200w).
- `standalone/step-with-trish.html` — the same page as one self-contained file (fonts + images inlined, ~2.4 MB) for previews.

## Design notes
- Palette (client direction, 2026-09-08 — red was Trish's favourite colour): white ground, red-black ink `#1F1315`, crimson `#A6192E` accent (7.5:1 on white), burgundy `#6B1020` tribute band, wine `#4E0C19` footer. Classy = restraint: two red bands, thin red rules, one red word, one red stroke.
- Hero: floating oak staircase revealed plank by plank on load, headline hanging over the frame edge, red brush stroke under the accent word.
- "Our story": the client's tribute copy, verbatim, on a burgundy band with a serif-italic tagline.
- Sections: our story → materials (sample table + expanding image accordion: hover / tap / keyboard) → the three-step process as a staircase → herringbone feature band → consult form.
- Motion honors `prefers-reduced-motion`; everything resolves visible without JavaScript.
- Easter egg: type `step` (or the Konami code) and every pointer move leaves a footprint. Esc stops it.

## Before publishing (client data — nothing here is invented)
0. **Name check:** the logo reads "Step **With** Trish", the About copy reads "Step **For** Trish" — confirm which, then swap every occurrence.
1. Drop the real logo into the header/footer `.brand` slots (a type lockup stands in).
2. Add phone, studio address, email, hours and service area.
3. Wire the consult form to an endpoint or inbox — it currently tells the visitor it is not connected yet.
4. Legal pages, then the SEO pass (title/meta/canonical/Open Graph + JSON-LD).

## Verified
0 px horizontal overflow at 1440 / 1024 / 768 / 390 · fonts and images proven in-browser · zero console errors · device emulation
(iPhone 13, small Android, landscape): tap-to-open accordion, menu sheet, anchors clear of the fixed header, all touch targets ≥ 44 px.
