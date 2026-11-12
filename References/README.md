# References Folder — Required Assets

Drop your files here matching the exact paths below. Missing files fall back to a placeholder (grey box with the filename) — so nothing breaks.

references/
├── logo/
│ ├── logo.svg # Full lockup: mark + wordmark "Satvam"
│ └── logo-mark.svg # Mark only (for favicon, popups, mobile nav)
├── palette/
│ └── palette.png # Optional reference; do not import in code
├── hero/
│ ├── hero-1.webp # Hero background layer 1 (furthest)
│ ├── hero-2.webp # Hero mid layer
│ └── hero-3.webp # Hero foreground layer
├── journey/
│ ├── journey-01-seed.webp
│ ├── journey-02-growth.webp
│ ├── journey-03-harvest.webp
│ ├── journey-04-extract.webp
│ └── journey-05-bottle.webp
├── products/
│ ├── {slug}-bottle.webp # e.g. keshkanti-bottle.webp
│ └── {slug}-ingredients.webp # ingredient flat-lay for that product
├── reviews/
│ ├── {slug}-before.webp
│ └── {slug}-after.webp
├── certificates/
│ ├── fssai.webp
│ ├── gmp.webp
│ ├── cruelty-free.webp
│ └── dermatologist.webp
├── about/
│ └── origin.webp # Historic/artisan photo
├── payment/
│ ├── card.svg # or .png
│ ├── upi.svg
│ └── wallet.svg
└── icons/ # Optional custom icons


## 20 Product Slugs (must match)
`keshkanti`, `amla-pitta`, `shirodhara`, `vanaspati`, `pushpa-vetiver`, `rasayana`, `kumkumadi`, `neelibhringadi`, `tiladi-men`, `keshini-men`, `sariva`, `mahabhringraj`, `chandanadi`, `yastimadhu`, `japa`, `triphala`, `arjunadi`, `karanja`, `devadaru-men`, `shubhra-kids`

## 5 Hero Slugs (Shop page)
`keshkanti`, `amla-pitta`, `shirodhara`, `vanaspati`, `pushpa-vetiver`

## Image specs
- **Bottles:** 1200×1200 webp, cream background, centered, top of cap visible
- **Ingredient flat-lay:** 1200×1200 webp, top-down
- **Before/After:** 800×800 webp each
- **Certificates:** 1000×1300 webp (portrait, framed look)
- **Hero:** 2000×1200 webp each layer

Missing images render as a neutral placeholder card with filename caption — safe for build without full assets.

## Hero parallax graceful degradation

`hero-1`, `hero-2`, `hero-3` are AI-generated reference images, NOT a
professionally composited parallax set. They will likely have slightly
different horizon lines and lighting angles.

**If all three load and compositing looks good** (the agent should test in
browser — screenshot, judge by eye): use the 3-layer parallax as specced.

**If compositing looks broken** (horizon lines don't match, lighting
direction is inconsistent, focal length differs noticeably):
- Use `hero-2` as the ONLY hero background image at scale 1.1
- Apply the same gentle parallax (translateY 0 → -120px over one viewport)
- Do NOT use hero-1 or hero-3
- Hero still looks beautiful — single editorial background with subtle
  parallax is a completely valid design choice

Do not spend more than 10 minutes attempting to fix layer compositing.
The fallback is not a downgrade — it's the professional call.