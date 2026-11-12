# Commit Convention

Format: `<type>(<scope>): <subject>`

**Types:** feat, fix, style, refactor, chore, docs, perf, test
**Scopes:** home, shop, products, about, trust, profile, journey, cart, profile-store, design, data, config

## Examples
- `chore(config): scaffold vite + tailwind + router`
- `feat(design): add tailwind tokens for palette and typography`
- `feat(home): logo flash-in animation on first visit`
- `feat(shop): shatter-orbit ingredient reveal on bottle click`
- `fix(shop): cart badge count double-increment on rapid add`

## Rules
1. One logical change per commit.
2. Branch per page: `feature/<page>`; merge to `main` only after visual check.
3. Never commit `.env` or large binary assets (>2MB per image).
4. Every merged feature = one `chore(main): merge feature/<page>` commit.