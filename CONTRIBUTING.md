# Contributing to SATVAM

Thank you for your interest in contributing to **SATVAM — Heritage Ayurveda**! We welcome open-source contributions from developers, designers, and Ayurvedic researchers around the globe.

This guide outlines our development workflow, standards, and conventions to make collaborating as smooth and effective as possible.

---

## 📜 Code of Conduct

We are dedicated to providing a welcoming, diverse, and respectful environment for all contributors.
- **Respect & Courtesy:** Treat everyone with kindness, empathy, and professional courtesy.
- **Constructive Collaboration:** Critique ideas, not people. Focus on what is best for the project and community.
- **Inclusivity:** All backgrounds, identities, and experience levels are celebrated. Harassment or exclusionary conduct of any kind is not tolerated.

---

## 🛠️ Getting Started

### 1. Fork and Clone
Fork the repository on GitHub and clone your fork locally:
```bash
git clone https://github.com/<your-username>/satvam.git
cd satvam
```

### 2. Set Up Upstream Remote
Keep your fork synchronized with the main project:
```bash
git remote add upstream https://github.com/JanardhanS56/satvam.git
git fetch upstream
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your `VITE_GROQ_API_KEY` if you plan to work on or test the AI Consultation module.

### 5. Launch Development Server
```bash
npm run dev
```

---

## 🌿 Branching Strategy

- Always create a dedicated feature or bugfix branch off `main`:
  ```bash
  git checkout -b feat/your-feature-name
  # or
  git checkout -b fix/issue-description
  ```
- Keep branch names lowercase, using hyphens to separate words. Recommended prefixes:
  - `feat/`: New user-facing feature or enhancement
  - `fix/`: Bugfix or patch
  - `docs/`: Documentation updates
  - `style/`: Visual refinement, UI spacing, or animation tuning
  - `refactor/`: Code reorganization without functional changes
  - `perf/`: Performance optimizations

---

## 📝 Commit Conventions

We enforce the **[Conventional Commits](https://www.conventionalcommits.org/)** specification (`<type>(<scope>): <subject>`).

### Commit Types
- `feat`: A new feature (e.g., `feat(shop): add dosha filter tags`)
- `fix`: A bug fix (e.g., `fix(nav): correct logo alignment in mobile drawer`)
- `docs`: Documentation changes (e.g., `docs(readme): add environment setup guide`)
- `style`: Formatting, white-space, or aesthetic CSS changes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Build process, dependencies, or toolchain updates

### Guidelines
- Use imperative, present tense ("add", "fix", not "added" or "fixes").
- Do not capitalize the first letter of the subject.
- Do not end the subject line with a period.
- Reference issue numbers when applicable (e.g., `fix(cart): resolve quantity decrement bug (#42)`).

---

## 🎨 Design & Code Standards

### 1. Ayurvedic Palette & Design Tokens
All components should adhere strictly to the SATVAM design system:
- **Parchment Base:** `#FAF7F0` (Day) / `#151D16` (Night)
- **Deep Botanical Green:** `#2D3E2F` (Day) / `#A3B899` (Night text/accents)
- **Sacred Gold Accent:** `#C9A961` (Light) / `#D4B876` (Dark)
- **Earth Umber:** `#6B5B45` (Subtitles, muted details)
- **Borders:** `#6B5B45/15` or `#C9A961/30`
- Use the semantic classes defined in `tokens.css` and `globals.css` rather than arbitrary one-off colors wherever possible.

### 2. Dark Mode Compatibility
- The application uses Tailwind's `darkMode: 'class'` with adaptive theme tokens.
- When creating or modifying UI components, always verify both light mode and dark mode styling.

### 3. Image Handling
- Always use the `SafeImage` component from `src/lib/images.js` for rendering imagery.
- `SafeImage` automatically resolves local `/references/` paths and gracefully displays branded SVG fallback placeholders if an asset is missing or fails to load.

### 4. Responsiveness & Touch Targets
- Mobile-first approach: test all views on mobile viewport (`375px`), tablet (`768px`), and desktop (`1024px+`).
- Ensure all interactive elements (buttons, pills, icons) have minimum touch targets of at least 44×44px on mobile devices.

### 5. Smooth Scrolling & Animation Performance
- The project leverages **Lenis** and **GSAP** for smooth kinetic interactions.
- Avoid heavy layout recalculations or unthrottled scroll listeners that trigger frame drops. Prefer CSS transforms, opacity changes, and hardware-accelerated transitions.

---

## 🧪 Verification Before Submitting

Before committing and opening a Pull Request, ensure that the application builds with zero errors:

```bash
# Verify static production build
npm run build
```

Verify that:
- [ ] No build or compilation errors exist.
- [ ] Responsive layouts render properly on both mobile and desktop viewports.
- [ ] Both Light and Dark theme modes render cleanly with high contrast.
- [ ] No personal API keys or credentials are committed to version control.

---

## 🚀 Submitting a Pull Request

1. **Push your branch to your fork:**
   ```bash
   git push origin feat/your-feature-name
   ```
2. **Open a Pull Request:** Navigate to the main [SATVAM Repository](https://github.com/JanardhanS56/satvam) and click **"New Pull Request"**.
3. **Describe your changes:**
   - Clearly state the purpose of the PR and what problem it solves.
   - Include screenshots or screen recordings for any visual changes.
   - Reference any linked issues.
4. **Code Review:** Maintainers will review your submission and may request minor adjustments. Once approved, your PR will be squash-merged into `main`.

---

## 💬 Getting Help

If you encounter questions, need clarification on architectural design, or wish to propose a major feature, please [open a GitHub Discussion](https://github.com/JanardhanS56/satvam/discussions) or submit an Issue.

Thank you for helping keep the heritage of Indian Ayurvedic botany alive through craft and technology!
