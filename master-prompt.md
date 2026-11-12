# MASTER PROMPT — Satvam Website Build

You are the sole engineer building **Satvam**, a fictional Ayurvedic herbal hair-oil brand's showcase website for a college 3D-web-design competition. You have ~6 hours. Every minute counts. Ship working, beautiful, judge-ready.

## 0. What you are building

A 6-page (plus skippable journey intro) single-page-app e-commerce showcase. Pure frontend. No auth. No backend. Demo payment modal only. localStorage for profile/cart/wishlist/favorites/popups toggle.

**The site must feel:** luxurious, slow, warm, ancient-yet-modern. Like a Loro Piana ad if it sold hair oil. Never cluttered, never generic.

**The judges will do exactly this:**
1. Land on `/` → see logo flash in → scroll through hero → click "Enter" or "Skip journey"
2. Journey (if not skipped) → 5 scroll scenes → land on `/`
3. Click "Shop" → hover products → click a bottle → see ingredient orbit animation → add to cart → open cart → checkout → demo payment modal → success
4. Click "Know More" on a product → `/products#keshkanti` → read ingredients, how-to-use, reviews, before/after
5. Visit `/about` → founders, milestones, stats
6. Visit `/trust` → certificates in herb frames, FAQ, myth-busting
7. Visit `/profile` → rename, take personalisation quiz → Groq returns 1-3 product suggestions → click suggestion → goes to `/products`
8. Notice popup appears every ~45s (unless disabled in profile)

**Your single success metric:** when a judge says "wait, is this real?" after the ingredient-orbit animation and the certificate page.

---

## 1. Non-negotiable constraints

- **Pure frontend.** No Node/Python server. Groq called client-side via `import.meta.env.VITE_GROQ_API_KEY`.
- **2D only.** No react-three-fiber, no GLB. "3D feel" achieved via CSS `perspective`, GSAP, sprites, `transform`, and the sprite-orbit illusion. Do not attempt true mesh shattering.
- **Perf budget:** 60fps on i5 integrated GPU. `will-change` on animated elements only. `loading="lazy"` + `decoding="async"` on all images below the fold.
- **Accessibility:** all interactive elements keyboard-focusable. `prefers-reduced-motion` disables GSAP timelines (fall back to instant states).
- **Responsive:** 1440 / 1024 / 768 / 375 breakpoints. Mobile-first.
- **Every image path** is `references/...` — never inline base64, never import from `public/`.

## 2. File ownership

| Path | Owner |
|---|---|
| `src/data/products.json` | single source of truth for products |
| `src/styles/tokens.css` | CSS custom properties from design.md |
| `src/lib/gsap.js` | centralized GSAP registration + helpers |
| `src/lib/groq.js` | wrapper for `/api/recommend` via Groq |
| `src/stores/*.js` | Zustand stores |
| `src/components/*` | reusable |
| `src/pages/*` | one file per route |

## 3. Build order (do NOT deviate)

1. Foundation (Vite, Tailwind, Router, layout shell, tokens, fonts, Lenis, GSAP, Zustand skeleton) → branch `feature/foundation` → merge to main
2. Home (`/`) → `feature/home` → merge
3. Shop (`/shop`) → `feature/shop` → merge
4. Products (`/products`) → `feature/products` → merge
5. About (`/about`) → `feature/about` → merge
6. Trust (`/trust`) → `feature/trust` → merge
7. Profile (`/profile`) → `feature/profile` → merge
8. Journey (`/journey`) — 2D scroll scenes — final branch → merge
9. Polish + Vercel deploy config

For each branch: at least 8–15 micro-commits per Conventional Commits. Never force-push `main`.

**Hard stop times:** if hour 4.5 arrives and `/profile` isn't done, ship `/profile` as a stub with just user info + quiz — skip wishlist/orders tabs. The judges weight home + shop + products.

## 4. Feature specs — every one is required

### Logo flash-in (Home, first visit only)
- `logo-mark.svg` from `references/logo/` fades + scales in over 800ms, gold shimmer sweep across it (CSS `mask-image` + animated gradient), then settles.
- Stored `localStorage.satvam_seen_intro = "1"`.
- Reduced-motion: instant fade.

### Hero (Home)
- Full-viewport. Warm ivory background. Logo mark centered top, brand name in Fraunces below, tagline *"From India's Roots to Your Roots."* beneath in small caps, letter-spaced.
- Subtle parallax on `references/hero/hero-*.webp` (2–3 layers, translateY + opacity tied to Lenis scroll).
- Two CTAs: **Enter the Atelier** (primary, gold) → `/shop`; **Skip the journey** (ghost) → `/shop` and sets `satvam_skip_journey = "1"`.
- Below fold: three-line brand promise strip with icons (leaf, mortar, bottle).

### Journey (`/journey`) — skippable
Route is `/journey`. If `sessionStorage.satvam_skipped !== "1"` AND `satvam_skip_journey !== "1"` AND first visit, redirect `/` → `/journey` once. Otherwise `/` renders hero directly with a "Replay the journey" link in the footer.

Five 100vh scroll scenes, each tied to a `references/journey/journey-0N-*.webp` image:
1. Seed → soil (image parallax, 3 lines of copy fading in)
2. Growth → monsoon (image swap on scroll, plant illustration rising)
3. Harvest → farmer hands (warm copy about rural sourcing, one stat badge "740+ partner farmers")
4. Extraction → cold-press (steam/sparkle sprite animation, "no heat, no chemicals" callout)
5. Bottle → pour (final image, then a gold "Enter" CTA → `/shop`)

Each scene has a small *"Problem → Our answer"* chip pair — e.g. *"Chemical solvents"* → *"Cold-pressed only"*. This directly satisfies requirement #3.

### Shop (`/shop`) — marketing surface, 5 hero products only
- Scrollable grid of the 5 `hero: true` products from `products.json`.
- Each card: bottle image, name (Fraunces), subtitle, price + strikethrough if discount, bestseller ribbon if flagged, star rating, "Add to cart" + "Know more" buttons.
- **Hover:** card lifts (`translateY(-8px)`, shadow), bottle image tilts 3D via CSS `perspective` on `mousemove` (max ±8deg), ingredient names fade-slide in around the edges.
- **Click bottle image:** triggers the **shatter-orbit** effect (see §4.1 below).
- **Click "Know more":** `navigate('/products#' + slug)`.
- Cart drawer slides in from right, glassmorphic, lists items + quantities + subtotal, "Checkout" button → payment modal.

### §4.1 Shatter-Orbit Ingredient Reveal (the money shot)
On bottle image click:
1. Bottle `scale(1.05)` + `brightness(1.1)` (200ms).
2. 12–18 sprite shards (small translucent glass polygons, absolutely positioned) explode outward from bottle center via GSAP.
3. 6 ingredient sprites (small circular images referencing `references/products/{slug}-ingredients-*.webp` OR fallback emojis if missing) orbit the (now faded) bottle center on a tilted ellipse (CSS `transform-origin` center, `rotate3d` + `translateX`), one at 0°, 60°, 120°, 180°, 240°, 300°.
4. Each sprite's label (ingredient name, in Fraunces) fades in near the sprite and back out — staggered 300ms apart, cycling.
5. After 5s, reverse: sprites implode back, shards reconvene, bottle returns to normal.
6. Click anywhere during or after → replay from step 1.

Implementation: single `<IngredientOrbit product={p} />` component, GSAP timeline, one click handler. Reduced-motion: instant show/hide of a static ingredient list overlay.

### Products (`/products`) — full catalog, 20 items
- Grid of all 20 products from `products.json`, CSS columns responsive (2/3/4).
- Card hover: image crossfades to `ingredientsImage`, name shifts up, gold underline draws in.
- Click card → route to `/products#slug` and open a `ProductDetailModal` (or a details region rendered below on hash — use modal for simplicity).
- Modal tabs: **Overview · Ingredients · How to Use · Reviews**.
  - *Overview:* description, target gender chip (if `targetGender !== "all"` show "For Men" / "For Women"), hair-type chips, concern chips, price, add-to-cart.
  - *Ingredients:* each ingredient row shows Sanskrit name, role, percentage as a slim bar. One-paragraph `whyThisHerb` explainer.
  - *How to Use:* 4 icon steps from `howToUse[]` — each is a Lucide icon (moon, hand, clock, droplets, comb, etc.) with title + description.
  - *Reviews:* 3 review cards (name, stars, text), then a before/after image pair from `references/reviews/` side-by-side with labels, a 5-star aggregate header.
- Filter bar at top: All · For Men · For Women · Hair Fall · Dandruff · Growth · Dryness (client-side filter on `concerns` / `targetGender` / `hairTypes`).

### About (`/about`)
Sections stacked, editorial layout:
1. **Origin** — 2-column: left photo (`references/about/origin.webp`), right story (3 short paragraphs about a grandmother's recipe, a chemist granddaughter, and 2018 founding).
2. **Founders** — 2 cards with initials avatar (no photo required yet), name, role, 1-line bio. Fictional: *Aarohi Deshpande (Founder & Formulator)*, *Vihaan Iyer (Head of Farmer Partnerships)*.
3. **Milestones** — vertical timeline with 6 entries (2018 founded, 2019 first 1000 bottles, 2021 FSSAI certified, 2022 740 farmer partners, 2023 ₹4.2Cr revenue, 2024 500K customers).
4. **By the numbers** — 4 stat cards: 500K+ customers · 4.8/5 rating · 740+ farmers · 32 states shipping.
5. **Recognition** — logo strip (text-styled mock press mentions: YourStory, Vogue India, Mint Lounge).
6. **Social proof** — 3 testimonial cards quoting fictional customers with platform tag (Instagram / Google / Amazon).

### Trust (`/trust`) — certificates + FAQ + myths
1. **Certificates gallery** — 4 framed certificates laid out on a decorative herb-border background (SVG vines). Each frame is a `references/certificates/*.webp` inside a gold double-border frame with a small caption (FSSAI · GMP · Cruelty-Free · Dermatologist Tested). Hover: frame lifts.
2. **FAQ** — accordion, 8 questions filtered by category chips (Health · Beauty · Price · Availability · Shipping). Answers 2–3 sentences each, written in Satvam's voice.
3. **Myths vs Facts** — 4-card 2-col layout: left card `MYTH:` (muted red), right card `FACT:` (forest green), split by a vertical gold divider. Address: "oil makes hair fall" / "natural means safe" / "men don't need hair oil" / "coconut oil alone is enough".

### Profile (`/profile`)
- Assign random name on first visit: `"Guest-" + Math.random().toString(36).slice(2,7)`, editable inline.
- Editable fields: name, gender (all/male/female), age band, hair-type multi-select.
- **Personalisation quiz:** 6 questions (5 MC + 1 free-text optional). On submit → `groqRecommend(answers)` in `src/lib/groq.js`:POST https://api.groq.com/openai/v1/chat/completions
model: "llama-3.3-70b-versatile"
system: Return JSON { classification: { hairTypes[], concerns[], genderPref }, suggestedSlugs: string[], reasonPerSlug: { slug: string } }

The prompt embeds the 20 product slugs + their `hairTypes` + `concerns` + `targetGender`. Groq picks ≤3 slugs. Render each pick as a card with reason + "Go to product" button → `/products#slug`.
**Fallback** if Groq fails: filter `products.json` by matching concerns — pure JS.
- **Wishlist tab / Favorites tab / Cart tab** — reads from Zustand stores (persisted localStorage). Each item row has "Buy" (opens cart+payment) or "Remove".
- **Popup toggle:** `Disable popups for me` switch → `satvam_popups_disabled` in localStorage.

### Global popups
`<PopupScheduler />` mounted in App. First popup after 10s, then every 45s, max 3 per session. Rotating content array:
- "🎁 20% off Keshkanti — this week only" → CTA to `/products#keshkanti`
- "✨ Try our personalisation quiz" → `/profile#quiz`
- "⭐ Vatika… " (uses real slug) → product link
- "⏳ Offer ends soon"
Bottom-right toast, dismissible, remembers dismissal for session. Skip entirely if `satvam_popups_disabled === "1"`.

### Cart + payment (demo)
Cart drawer state in Zustand. Checkout button → modal with 3 tabs: Card / UPI / Wallet (icons from `references/payment/`). Any input is a placeholder — nothing validated. "Pay Now" → 2s spinner → success screen (checkmark + "Payment simulated for demo") → closes modal, clears cart. **No persisted order history. No "Order placed!" sticky toasts.**

### Footer (all pages)
3-column: brand block (logo, tagline, "Made in India" flag icon) · links (Shop, Products, About, Trust, Profile) · help (email, chat, "Replay the journey" link if previously skipped). Bottom line: `© 2026 Satvam · Fictional brand created for a college competition`.

---

## 5. Copy voice

Warm, confident, slightly literary. Avoid ad-speak clichés ("revolutionary", "game-changing"). Use Sanskrit terms sparingly with inline definition on first use. Sample line for the shop header: *"Five oils. Twenty herbs. One lineage."*

Every product has a `tagline` field — use it under the name everywhere.

## 6. What you must NOT do

- ❌ No fake "Order confirmed" toasts or order history lists
- ❌ No modal spam — only the popup scheduler
- ❌ No stock lorem ipsum — use the voice
- ❌ No 3D libraries
- ❌ No external CDN fonts loaded after `main.jsx` — preload in `index.html`
- ❌ No images from `public/` — everything `references/`

## 7. Deploy

`vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`. `.env.example` lists `VITE_GROQ_API_KEY=`. Build command `npm run build`, output `dist`.

## 8. Definition of done

See `expected-output.md` — that's your acceptance test. If any line there fails, you are not done.

note: Read order for the agent: master-prompt.md → design.md → references/README.md → data/products.json → requirements.md → implementation-plan.md.

Branch strategy (for git micro commits to my remote repo "https://github.com/JanardhanS56/satvam.git")
Six feature branches, each merged to main only after visual approval:
feature/foundation → feature/home → feature/shop → feature/products → feature/about → feature/trust → feature/profile.

Conventional commits inside each branch. See commit-convention.md.

References folder
All imagery lives in references/. See references/README.md for exact filenames expected.