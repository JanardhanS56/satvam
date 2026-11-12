# Expected Output — The 3-Minute Judge Walkthrough

Print this. Read it to the judges. Memorize the beats.

## 1. Opening (0:00 – 0:20)
Landing on `/`. Logo flash-in plays — gold shimmer sweeps across `SATVAM`. Brand name settles. Tagline *"From India's Roots to Your Roots."* fades up. Judges already leaning in.

> **Say:** "Satvam is a fictional Ayurvedic hair oil brand. Every product, farmer, and certificate on this site is invented — but every design decision is real."

## 2. Journey (0:20 – 1:00)
Hit **Enter the Atelier**. Five scroll scenes: seed → growth → harvest → extraction → bottle. Each has a "problem → our answer" chip.

> **Say:** "Our first trust signal is the supply chain. No chemical solvents, no middlemen — the story is the product."

## 3. Shop (1:00 – 2:00) ⭐ the money shot
Click **Shop**. Hover a bottle — card lifts, bottle tilts under your cursor, ingredient names drift in around the edges. **Click the bottle image.** Glass shards explode outward, six ingredient sprites orbit the bottle on a tilted ellipse, each label fading in and out — *Bhringraj · Keshraj · 22% · follicle stimulation* — then everything reconverges.

> **Say:** "This is what the bottle is actually made of. Click it again — it replays. Every hero product reveals itself the same way."

Add to cart. Open cart drawer. Hit **Checkout**. Payment modal — Card / UPI / Wallet. Type anything. Pay Now. Spinner. "Payment simulated for demo."

> **Say:** "No fake order confirmations, no pretending. The judges see exactly what a real payment flow would look like."

## 4. Products (2:00 – 2:30)
Click "Know more" on Keshkanti → lands on `/products#keshkanti` with the modal already open. Tab through: **Overview** (target hair, gender, concerns), **Ingredients** (Sanskrit names + percentage bars + why-this-herb paragraph), **How to Use** (4 Lucide-icon steps), **Reviews** (3 cards + before/after pair).

> **Say:** "Every ingredient has a Sanskrit name and a *reason*. Every product tells you who it's for — including men's-specific formulas like Tiladi and Keshini."

## 5. About (2:30 – 2:45)
Origin story — grandmother's recipe, chemist granddaughter, 2018. Milestones timeline. 740 farmer partners. 500K customers.

## 6. Trust (2:45 – 2:55)
Certificates in herb-lined gold frames. FAQ filtered by category. Myths-vs-facts: *"Oil makes hair fall" — MYTH. "Men don't need hair oil" — MYTH.*

## 7. Profile + AI (2:55 – 3:10)
Open profile. Name yourself live. **Take the 6-question quiz.** Groq returns 3 products with personalised reason lines. Click a suggestion → lands on `/products#slug` with modal open.

> **Say:** "This uses Groq's Llama-3.3-70B to classify the user's answers, then matches against our product database. One free-text question at the end captures anything the multiple choice missed."

## 8. The one thing to close with

Scroll back to any product, click the bottle, and let the orbit animation play in silence while you say:

> **"Everything you saw — every animation, every page, every AI suggestion — was built in six hours."**

Drop mic. Wait for questions.

---

## Judge-proof detail checklist (have these ready)

- Which products target men specifically? → *Tiladi, Keshini, Devadaru*
- Where do the herbs come from? → *740 partner farmers across 6 states, direct trade, no middlemen*
- What's the AI doing? → *Classification + database match + reason generation — not free-text hallucination*
- Why 60/30/10? → *60% ivory canvas (calm), 30% forest/bark (herbal trust), 10% gold/hibiscus (action, warmth)*
- What happens if images are missing? → *Graceful placeholder with filename, no crash*
- What about accessibility? → *`prefers-reduced-motion` disables all timelines; every interactive element keyboard-reachable*
- What if the AI API is down? → *Client-side fallback filter on concerns — the quiz still works*