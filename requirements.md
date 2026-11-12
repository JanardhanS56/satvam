# Requirements — Accept / Reject Criteria

Every line is a test. If it fails, the feature is not done.

## Global
- [ ] Logo (from `references/logo/logo.svg`) appears in nav, footer, and hero
- [ ] Palette strictly follows 60/30/10 (ivory 60 / forest+bark 30 / gold+hibiscus 10)
- [ ] All text in Fraunces (display) + Inter (body); Cormorant SC for eyebrows
- [ ] Smooth scroll via Lenis enabled everywhere
- [ ] `prefers-reduced-motion` disables all GSAP timelines gracefully
- [ ] All images `loading="lazy"` except hero
- [ ] Nav: sticky, backdrop-blur, cart badge, user icon, mobile hamburger
- [ ] Popup scheduler: first at 10s, then 45s, max 3/session, dismissible, toggle in profile
- [ ] 404 route → redirect to home

## Home `/`
- [ ] On first visit, logo flash-in plays over 800ms with gold shimmer sweep; settles
- [ ] Hero: full viewport, logo center top, brand name hero-size, tagline below, two CTAs
- [ ] Hero parallax on hero-1/2/3.webp tied to scroll
- [ ] If `sessionStorage.satvam_skipped !== "1"` AND `localStorage.satvam_skip_journey !== "1"`, first visit auto-redirects to `/journey`
- [ ] "Replay the journey" link in footer navigates to `/journey`
- [ ] Footer has brand block, links, help, and copyright line

## Journey `/journey`
- [ ] 5 full-viewport scroll scenes with parallax
- [ ] Each scene has a "Problem → Answer" chip pair
- [ ] Final scene has "Enter the Atelier" CTA → `/shop` and sets `sessionStorage.satvam_skipped = "1"`
- [ ] Skip button in top-right sets `sessionStorage.satvam_skipped = "1"` and navigates to `/`

## Shop `/shop`
- [ ] Grid of exactly the 5 `hero: true` products
- [ ] Each card: image, name (Fraunces), subtitle, price, strikethrough if `discount`, bestseller ribbon if flagged, star rating, review count, Add-to-cart + Know-more buttons
- [ ] Hover: card lift + bottle tilt (max ±8°) following cursor
- [ ] Hover: ingredient names fade-slide around card edges
- [ ] **Click bottle image → shatter-orbit animation plays for exactly 5s, then resets. Clicking again replays from start.**
- [ ] Shatter-orbit: 12+ glass-shard sprites explode, 6 ingredient sprites orbit on tilted ellipse, labels fade in sequence
- [ ] Click "Know more" → routes to `/products#slug` (never opens orbit)
- [ ] Add to cart → Zustand cart increments, badge updates, no toast
- [ ] Cart drawer slides in from right, glassmorphic, list + quantities + subtotal, Checkout button
- [ ] Checkout opens payment modal

## Cart / Payment
- [ ] Payment modal has 3 tabs: Card, UPI, Wallet (icons from `references/payment/`)
- [ ] Any input works (no validation)
- [ ] "Pay Now" → 2s spinner → success screen with checkmark and "Payment simulated for demo"
- [ ] Success closes modal after 3s and clears cart
- [ ] **No order history persisted. No "Order confirmed" toasts.**

## Products `/products`
- [ ] Grid of all 20 products
- [ ] Card hover: image crossfade to `ingredientsImage`, gold underline draws in
- [ ] Filter bar: All / For Men / For Women / Hair Fall / Dandruff / Growth / Dryness
- [ ] Card click → `/products#slug` opens detail modal
- [ ] Detail modal tabs: Overview, Ingredients, How to Use, Reviews
- [ ] Overview shows: description, gender chip if `targetGender !== "all"`, hair-type chips, concern chips, price, Add-to-cart
- [ ] Ingredients tab: each ingredient shows name, Sanskrit name, role, percentage bar
- [ ] Ingredients tab: `whyThisHerb` paragraph shown below list
- [ ] How to Use tab: 4 steps, each with Lucide icon (from `howToUse[].icon`), title, description
- [ ] Reviews tab: 3 review cards + before/after image pair with labels + aggregate 5-star header
- [ ] Deep-link `/products#keshkanti` opens correct modal on load and on hashchange

## About `/about`
- [ ] Origin story: 2-column editorial with `references/about/origin.webp`
- [ ] Founders: 2 cards, initial avatars, names, roles, bios
- [ ] Milestones: vertical timeline, 6 entries
- [ ] By-the-numbers: 4 stat cards (500K+ customers, 4.8/5, 740+ farmers, 32 states)
- [ ] Recognition strip with mock press logos
- [ ] 3 testimonial cards with platform tag

## Trust `/trust`
- [ ] Certificates: 4 framed images from `references/certificates/` with herb-border SVG background, gold double borders
- [ ] Hover on cert → frame lifts
- [ ] FAQ accordion, 8 questions, filter chips (Health / Beauty / Price / Availability / Shipping)
- [ ] Myths vs Facts: 4 row 2-column, MYTH in muted red, FACT in forest green, gold divider between
- [ ] Myths covered: oil causes hair fall / natural = safe / men don't need oil / coconut oil alone

## Profile `/profile`
- [ ] Random name assigned on first visit as `Guest-XXXXX`, editable inline
- [ ] Editable fields: name, gender, age band, hair-types multi-select
- [ ] Personalisation quiz: 5 MC + 1 free-text optional
- [ ] Quiz submit → `groqRecommend()` → returns ≤3 product suggestions with 1-line reason each
- [ ] Groq failure → fallback JS filter by concerns, still returns suggestions
- [ ] Each suggestion card: bottle thumbnail, name, reason, "Go to product" → `/products#slug`
- [ ] Wishlist / Favorites / Cart tabs read from stores; each row has Buy or Remove
- [ ] "Disable popups for me" toggle → sets `localStorage.satvam_popups_disabled = "1"` and immediately suppresses next popup

## Performance & Build
- [ ] `npm run build` succeeds with no TS/ESLint errors (no TS used; no ESLint required)
- [ ] Lighthouse Performance ≥ 80 on desktop, ≥ 65 on mobile
- [ ] Deploys to Vercel successfully with `vercel.json` rewrite
- [ ] All feature branches merged to `main`; commit log shows conventional commits

## Failure modes to explicitly verify
- [ ] Missing `references/products/keshkanti-bottle.webp` → placeholder card shows with filename, page still works
- [ ] Missing `VITE_GROQ_API_KEY` → quiz falls back to JS filter, no crash
- [ ] `prefers-reduced-motion: reduce` → hero parallax disabled, shatter-orbit shows static list, journey scenes instant
- [ ] Direct URL `/products#mahabhringraj` opens correct product modal