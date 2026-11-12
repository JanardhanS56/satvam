# Implementation Plan — 6h Sprint

Assumes one dev working with an AI agent. Each phase = one branch = one merge.

## Phase 0 — Foundation (0:00 → 0:40)
**Branch:** `feature/foundation`
1. `git init`, `.gitignore`, `README.md`, `commit-convention.md`
2. `npm init`, install deps, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `.env.example`
3. `src/main.jsx` — router, Zustand providers, Lenis init, GSAP registration
4. `src/App.jsx` — layout shell (Nav + Outlet + Footer)
5. `src/styles/tokens.css` — CSS vars from design.md
6. `src/styles/globals.css` — Tailwind directives + base
7. `src/components/Nav.jsx`, `src/components/Footer.jsx` — basic
8. `src/components/PopupScheduler.jsx` — skeleton
9. `src/stores/{cart,profile,ui}.js` — Zustand with persist
10. `src/lib/{gsap,images}.js` — helpers (image fallback, prefers-reduced-motion)

**Commits (~12):** `chore(config): ...` × 8, `feat(design): tokens`, `feat(design): nav + footer`, `feat(design): stores`

**Merge to main.**

## Phase 1 — Home (0:40 → 1:35)
**Branch:** `feature/home`
1. `src/pages/Home.jsx` — hero + promise strip + footer contact
2. `src/components/LogoIntro.jsx` — flash-in with shimmer
3. `src/components/Hero.jsx` — parallax
4. `src/components/ContactFooter.jsx` — helpdesk + email + chat mock
5. Journey teaser card with Skip / Enter buttons
6. First-visit redirect to `/journey` logic

**Commits (~10):** `feat(home): hero layout`, `feat(home): logo shimmer intro`, `feat(home): parallax layers`, `feat(home): contact footer`, `feat(home): journey redirect`, ...

**Merge.**

## Phase 2 — Shop + Cart + Payment (1:35 → 2:55) ⭐ critical
**Branch:** `feature/shop`
1. `src/data/products.json` — wire in (from this doc)
2. `src/pages/Shop.jsx` — grid of hero products
3. `src/components/ProductCard.jsx` — hover tilt + ingredient name reveal
4. `src/components/IngredientOrbit.jsx` — **shatter-orbit GSAP timeline** (budget 45 min!)
5. `src/components/CartDrawer.jsx` — glassmorphic, drawer
6. `src/components/PaymentModal.jsx` — 3 tabs + demo payment flow
7. Cart store operations: add, remove, updateQty, clear

**Commits (~15):** `feat(shop): hero grid`, `feat(shop): product card hover`, `feat(shop): shatter-orbit skeleton`, `feat(shop): shard sprites`, `feat(shop): ingredient orbit labels`, `feat(shop): cart drawer`, `feat(shop): payment tabs`, `feat(shop): pay simulation`, `fix(shop): cart double-count`, ...

**Merge.** ← If shatter-orbit isn't beautiful yet, still merge — you can iterate in a fixup commit later without blocking downstream pages.

## Phase 3 — Products (2:55 → 3:50)
**Branch:** `feature/products`
1. `src/pages/Products.jsx` — 20-grid, filter chips
2. `src/components/ProductDetailModal.jsx` — tabbed modal
3. Tabs: `OverviewTab`, `IngredientsTab`, `HowToUseTab`, `ReviewsTab` (all inside modal file or split)
4. Hash-link handling — on mount and `hashchange`, open correct modal
5. Image crossfade on card hover

**Commits (~12):** `feat(products): grid + filter`, `feat(products): modal shell`, `feat(products): ingredients tab`, `feat(products): how-to icons`, `feat(products): reviews + before-after`, `feat(products): deep-link hash`, ...

**Merge.**

## Phase 4 — About + Trust (3:50 → 4:35)
**Branch:** `feature/about` then `feature/trust` (two branches)

About (20 min): origin, founders, milestones, stats, press, testimonials.

Trust (25 min): certificates grid + herb-border SVG, FAQ accordion, myths-vs-facts.

**Merge each.**

## Phase 5 — Profile (4:35 → 5:20)
**Branch:** `feature/profile`
1. `src/pages/Profile.jsx` — user info editable
2. `src/components/PersonalisationQuiz.jsx` — 6 questions
3. `src/lib/groq.js` — API call + prompt + JSON parse + fallback
4. Suggestion cards
5. Wishlist / Favorites / Cart tabs reading stores
6. Popup toggle

**Commits (~14):** `feat(profile): user info editable`, `feat(profile): quiz form`, `feat(profile): groq classify`, `feat(profile): suggestion cards`, `feat(profile): wishlist tab`, `feat(profile): favorites tab`, `feat(profile): cart tab`, `feat(profile): popup toggle`, `fix(profile): fallback when groq fails`, ...

**Merge.**

## Phase 6 — Journey + Polish (5:20 → 6:00)
**Branch:** `feature/journey` + `feature/polish`
1. `/journey` 5-scene scroll animation (20 min)
2. Global popup content wiring (5 min)
3. Placeholder image fallbacks everywhere (5 min)
4. `prefers-reduced-motion` audit (5 min)
5. `vercel.json` + deploy (5 min)
6. Lighthouse pass (5 min)

**Merge. Deploy. Sleep.**

## Cutoffs
- **At 4:30**, if `/profile` isn't started → shrink it to: user info + quiz (no tabs). Ship.
- **At 5:20**, if `/journey` isn't done → ship without it (redirect always skipped; footer "Replay" hidden). Journey isn't judge-critical.
- **Never cut:** shop shatter-orbit, product modal, cart/payment flow.