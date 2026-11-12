# Design Language — Satvam

## Mood
Ancient Ayurvedic apothecary meets modern editorial luxury. Think: Aesop, Loro Piana, Kinfolk magazine — but rooted in Indian craft. Warm ivory, forest greens, muted gold, hand-drawn herb illustrations as accents. **Slow**, not busy. Every motion earns its place.

## Palette (60 / 30 / 10)

### 60% — Canvas
| Token | Hex | Use |
|---|---|---|
| `--satvam-ivory` | `#FAF7F0` | page background (all pages) |
| `--satvam-cream` | `#F5EFE3` | section alt backgrounds, cards |
| `--satvam-paper` | `#FFFFFF` | modal backgrounds, elevated cards |

### 30% — Structure
| Token | Hex | Use |
|---|---|---|
| `--satvam-forest` | `#2D3E2F` | primary text, footer, dark sections |
| `--satvam-bark` | `#6B5B45` | secondary text, borders |
| `--satvam-moss` | `#A3B18A` | subtle chips, dividers, hover states |

### 10% — Accent
| Token | Hex | Use |
|---|---|---|
| `--satvam-gold` | `#C9A961` | primary CTA, logo shimmer, underlines |
| `--satvam-hibiscus` | `#A8453D` | discount badges, "MYTH" cards, alert |
| `--satvam-saffron` | `#E8B44A` | rating stars, bestseller ribbon |

**Rule:** every page must read ~60% ivory, ~30% forest/bark text+structure, ~10% gold+hibiscus accents. If a screenshot looks greener than ivory, rebalance.

## Typography

- **Display / headings:** `Fraunces` (variable, optical size 144), weights 400–600. Tracking tight on big sizes (`-0.02em`), normal on small.
- **Body:** `Inter`, weights 400/500. 16px base, `line-height: 1.65`.
- **Accent / small caps:** `Cormorant SC` for taglines and eyebrow labels.

Loaded via Google Fonts with `font-display: swap`. **Preload only Fraunces 400 + Inter 400.**

### Scale
| Token | Size | Use |
|---|---|---|
| `--text-hero` | clamp(3.5rem, 8vw, 7rem) | home hero brand |
| `--text-h1` | clamp(2.5rem, 5vw, 4rem) | page titles |
| `--text-h2` | 2rem | section titles |
| `--text-h3` | 1.375rem | card titles |
| `--text-body` | 1rem | body |
| `--text-eyebrow` | 0.75rem (uppercase, letter-spacing 0.18em) | labels |

## Spacing
Base unit `4px`. Rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections use `py-24` (96px) default, hero uses full viewport.

## Shape & edge
- Corner radius: buttons `999px` (pill), cards `12px`, modals `20px`, images `4px` (keep them mostly rectangular for editorial feel).
- Borders: `1px solid var(--satvam-bark)/20` — never harsh.
- Shadows: `0 1px 2px rgba(45,62,47,0.04), 0 8px 24px rgba(45,62,47,0.06)` — soft, warm.

## Motion

**Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo) for most; `cubic-bezier(0.65, 0, 0.35, 1)` for in-out.

**Durations:** micro 200ms · transition 400ms · reveal 800ms · hero 1400ms.

**Principles:**
1. Everything enters, nothing bounces. No spring/elastic.
2. Scroll-driven reveals fade + translateY(24px) → 0 over 800ms, stagger 60ms per child.
3. Hover lifts are `translateY(-4px)` or `-8px`, never scale above 1.03.
4. Cursor-follow tilt on product cards: max ±8° with `perspective(800px)`.
5. Never animate `box-shadow` — use a shadow-carrying pseudo-element with opacity.
6. All motion respects `prefers-reduced-motion`.

## Imagery rules
- All imagery has warm tone — no cold blues. If images are too cool, apply `filter: saturate(0.95) hue-rotate(2deg)` subtle warmth.
- Bottle images: never crop the cap. Center on cream background.
- Ingredient images: circular crop when used in orbit.
- Certificates: keep full frame visible with caption below.

## Components — canonical snippets

**Button — primary**
```css
background: var(--satvam-gold);
color: var(--satvam-forest);
padding: 14px 28px;
border-radius: 999px;
font-weight: 500;
transition: transform 200ms var(--ease-out), background 200ms;
/* hover: transform: translateY(-2px); background: #D4B872; */
Button--ghost
background: transparent;
border: 1px solid var(--satvam-forest);
color: var(--satvam-forest);
padding: 14px 28px;
border-radius: 999px;

Crad:
background: var(--satvam-paper);
border: 1px solid rgba(107,91,69,0.15);
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 2px rgba(45,62,47,0.04), 0 8px 24px rgba(45,62,47,0.06);

font-family: 'Cormorant SC';
font-size: 0.75rem;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--satvam-bark);

Grid
Container max-width 1280px, horizontal padding 24px (mobile) / 48px (desktop). Product grid: 2 / 3 / 4 columns at 375 / 768 / 1280.

Logo usage
Primary: full lockup logo.svg in references/logo/. Used in nav (h-10), footer (h-12), Home hero (h-32).

Mark-only: logo-mark.svg for popups, favicon, mobile nav.

Never recolor. Never place on busy imagery without a cream circular scrim behind.

Dark-mode?
No. Satvam is a daylight brand. Single theme.

Nav bar
Sticky, backdrop-blur(12px), background rgba(250,247,240,0.75), bottom border 1px solid rgba(107,91,69,0.12). Logo left, links center (Shop, Products, About, Trust), right cluster: cart icon with badge, user icon. Mobile: hamburger → slide-over.
---
