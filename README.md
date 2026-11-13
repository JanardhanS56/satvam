# SATVAM — Heritage Ayurveda

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02.svg?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-satvam.vercel.app-2D3E2F.svg)](https://satvam.vercel.app)

**From India's Roots to Your Roots.**  
*Sacred cold-pressed hair elixirs crafted with single-origin Indian botanicals, wood-pressed slowly under 38°C to preserve whole plant vitality.*

[**Explore Live Atelier →**](https://satvam.vercel.app)

</div>

---

## 📖 Overview

**SATVAM** is an immersive digital flagship and modern e-commerce experience for an artisanal Ayurvedic hair wellness house. Rooted in ancient Charaka Samhita scriptures and sustained by fair-trade partnerships with 740+ smallholder farmers across Kerala, Karnataka, and Rajasthan, SATVAM harmonizes timeless botanical wisdom with modern interactive web design.

<img width="791" height="622" alt="Screenshot 2026-11-13 173355" src="https://github.com/user-attachments/assets/a8f057de-de50-4cea-a554-c298839a2f4c" />

---

## ✨ Key Features

- **🌱 5-Stage Seed-to-Bottle Journey:** An interactive narrative chronicle detailing the reverent lifecycle of each elixir — *Seed & Soil*, *Monsoon Growth*, *Dawn Harvest*, *Vaagai Wood Pressing*, and *Amber Flacon Bottling*. Featuring automated smooth transitions, touch pagination, and deep lineage storytelling.

<img width="1385" height="843" alt="Screenshot 2026-11-13 173415" src="https://github.com/user-attachments/assets/d6953d89-4dfe-4b7a-9d55-b6118c55a391" />


- **🏺 20 Signature Ayurvedic Formulations:** Complete digital apothecary catalog (`/shop` and `/products`) covering concerns such as stress-fall, DHT thinning, scalp congestion, premature graying, and dryness. Each formulation includes detailed ingredient dossiers, dosha profiles, botanical provenance, and usage rituals.

<img width="1167" height="773" alt="Screenshot 2026-11-13 173442" src="https://github.com/user-attachments/assets/86663b95-328f-4931-a416-10e5e56eb9b9" />


- **🤖 Vedic AI Scalp & Dosha Consultation:** Powered client-side by the Groq LLM API, providing patrons with personalized tri-dosha (Vata, Pitta, Kapha) scalp diagnostics and curated multi-stage oil recommendations.

<img width="1051" height="868" alt="Screenshot 2026-11-13 174306" src="https://github.com/user-attachments/assets/a555e6d5-0fa2-4893-bc2b-dca9145a62c5" />


- **🛍️ Complete Apothecary Basket & Mock Checkout:** Real-time slide-out cart drawer, quantity adjustment, coupon code verification, past order purchase history, and interactive Vedic payment gateway modal.

<img width="1167" height="773" alt="Screenshot 2026-11-13 173442" src="https://github.com/user-attachments/assets/05a92803-e120-47a0-989f-2b3615d6c13a" />


- **🌗 Vedic Day & Night Adaptive Theming:** 3-state segmented theme switcher (*Light*, *Dark*, *System*) preserving user preference in local storage. Features an authentic daytime warm parchment palette (`#FAF7F0`) and a deep nocturnal Ayurvedic forest palette (`#151D16` / `#1F2B20`).

- **👤 Patron Atelier Profile:** Interactive hair constitution quiz, custom avatar photo upload, saved wishlists, favorites collection, and persistent purchase chronicles.

<img width="1135" height="957" alt="Screenshot 2026-11-13 174419" src="https://github.com/user-attachments/assets/0f3a5724-39b5-4dfa-b0ac-fb6ac8d925ce" />


- **✨ Fluid Kinematics & Touch Optimization:** Ultra-smooth inertia scrolling powered by Lenis, micro-interactions with GSAP, and touch-calibrated mobile drawers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework & Core** | [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS 3](https://tailwindcss.com/), PostCSS, Custom CSS Tokens |
| **Animation & Kinematics** | [GSAP 3](https://greensock.com/gsap/), [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (Cart, Profile, Theme, UI) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Cormorant Garamond, Fraunces, Inter |
| **AI Integration** | [Groq SDK / REST API](https://groq.com/) |
| **Asset Pipeline** | Python (Pillow / Lanczos interpolation), Sharp (WebP optimization) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `v18.x` or higher
- **npm:** `v9.x` or higher
- *(Optional)* **Python 3.10+** with `Pillow` and `numpy` if running asset generation scripts.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JanardhanS56/satvam.git
   cd satvam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and provide your Groq API key (used for the AI Consultation feature):
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: The application will run without an API key, falling back to heuristic recommendations if the consultation service is unconfigured.)*

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   The atelier will be live at `http://localhost:5173`.

---

## 📦 Building for Production

Compile optimized static assets:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

---

## 📂 Project Architecture

```
satvam/
├── References/            # Botanical reference imagery and optimized WebP assets
│   ├── logo/              # Brand seal, vector marks, and lockups
│   └── products/          # High-resolution 1600x1600 WebP bottle assets
├── public/                # Static public assets
├── scripts/               # Image processing & asset generation utilities
│   ├── optimize-images.mjs # Sharp WebP optimization script
│   └── process_all_bottles.py # Lanczos 1600x1600 WebP batch generator
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Nav.jsx            # Sticky navigation bar & theme controls
│   │   ├── Hero.jsx           # Editorial hero header & lineage seal
│   │   ├── LiveJourneySection.jsx # 5-Stage interactive seed-to-bottle visualizer
│   │   ├── ProductCatalogCard.jsx # Product card with hover ingredient bubbles
│   │   ├── ProductDetailModal.jsx # Deep-dive formula modal
│   │   ├── CartDrawer.jsx     # Slide-out shopping basket
│   │   ├── PaymentModal.jsx   # Interactive checkout & payment simulator
│   │   ├── ThemeSwitcher.jsx  # 3-mode segmented light/dark theme toggle
│   │   └── Footer.jsx         # Lineage footer, apothecary credentials, dispatch
│   ├── data/
│   │   └── products.json      # Complete database of 20 Ayurvedic formulas
│   ├── lib/
│   │   └── images.js          # Resilient SafeImage component & asset normalization
│   ├── pages/                 # Route entrypoints
│   │   ├── Home.jsx           # Landing page with narrative journey
│   │   ├── Shop.jsx           # Complete catalog with concern filtering
│   │   ├── Products.jsx       # Grid view with dosha & gender segmentation
│   │   ├── Consultation.jsx   # Vedic AI diagnostic questionnaire
│   │   ├── About.jsx          # Lineage, botanical harvesting & ethical sourcing
│   │   ├── Trust.jsx          # Quality verification, heavy-metal lab tests & FAQ
│   │   └── Profile.jsx        # Patron accounts, custom avatar, & order history
│   ├── stores/                # Zustand client state stores
│   │   ├── cart.js            # Cart persistence & totals
│   │   ├── profile.js         # Patron preferences, quiz state, custom photo
│   │   ├── theme.js           # Theme state (light / dark / system)
│   │   └── ui.js              # Modal, drawer, and mobile menu state
│   ├── styles/
│   │   ├── globals.css        # Base resets, typography, and dark mode rules
│   │   └── tokens.css         # Luxury Ayurvedic design token palette
│   ├── App.jsx                # Router configuration & root layout
│   └── main.jsx               # Application bootstrap with Lenis smooth scroll
├── .env.example           # Example environment template
├── package.json           # Project manifest & script runner
├── tailwind.config.js     # Custom typography, colors, animations, and shadows
├── vercel.json            # Single-Page-App routing rewrite configuration
└── vite.config.js         # Vite configuration with custom references asset plugin
```

---

## 🎨 Design Philosophy & Palette

SATVAM adheres to the aesthetic principles of classical Indian apothecary houses:
- **Parchment Cream (`#FAF7F0`):** Evokes sun-bleached handmade Vedic paper.
- **Deep Vaagai Green (`#2D3E2F`):** Reflects dense Western Ghats rainforest foliage and sacred Vaagai hardwood.
- **Raw Umber & Earth (`#6B5B45`):** Grounding earth tones derived from fertile red soil.
- **Vedic Gold Accent (`#C9A961`):** Represents cold-pressed sesame oil clarity and pure brass vessel luster.

---

## 🤝 Contributing

We welcome contributions from the open-source community! Whether you are fixing a bug, adding new botanical data, improving accessibility, or refining animations:

Please review our [**Contributing Guide (CONTRIBUTING.md)**](CONTRIBUTING.md) for details on our workflow, conventions, and pull request process.

---

## 📄 License

This project is open-source and available under the terms of the [MIT License](LICENSE).

---

<div align="center">
  Crafted with reverence for ancient Indian botanical science.
</div>
