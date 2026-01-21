# Approach & Implementation Notes

## 1) Design-to-code workflow
- Started from provided Figma token export (JSON) and created a script to convert tokens into CSS variables and Tailwind config.
- `scripts/generate.token.cjs` emits `src/index.css` with base layer + theme-aware custom properties, and regenerates `tailwind.config.js` to align Tailwind tokens with the CSS vars.
- Built components (button, input, dropdown, card, login) in Preact, wiring them to tokenized utility classes so visual changes flow through design tokens.
- Verified in Storybook with controls and global theme switcher to ensure component states and interactive flows match the design (desktop + mobile layouts).

## 2) Token management
- Source of truth: Figma/JSON tokens (`figma-tokens.json`).
- Generation step: `npm run tokens` → runs `tokens` script to produce:
  - `src/index.css`: Tailwind base layer plus 600+ CSS custom properties for both brands.
  - `tailwind.config.js`: Extends Tailwind theme values to point to those CSS vars.
- Consumption:
  - Utility classes reference the CSS variables (e.g., `bg-surface-colour-action-primary`, `text-text-colour-body`).
  - Components rely on utilities usage, so visuals stay token-driven.

## 3) Theme switching (multiple brands)
- Two themes: `brandA` (default) and `brandB`.
- Switching mechanism: set `data-theme="brandB"` on a wrapping element (e.g., `body`, Storybook decorator root, or a specific container). No prop drilling required.
- `src/index.css` defines both brands’ CSS vars and scopes brand-specific overrides via `[data-theme="brandB"]`.
- Storybook toolbar exposes a Theme toggle (paintbrush icon) wired in `.storybook/preview.ts`; it wraps every story with `data-theme` on the root container.

## 4) When tokens change
- Update tokens in Figma/JSON → export/replace `figma-tokens.json`.
- Run `npm run tokens` to regenerate `src/index.css` and `tailwind.config.js`.
- Restart Storybook or Vite dev server if already running.
- Components automatically pick up new values because they read from CSS vars/Tailwind utilities; no component-level edits needed for pure token changes.

## 5) What I’d do differently with more time/production hardening
- Introduce token pipeline validation (style-dictionary or tokens-studio) with schemas/tests to fail CI on malformed tokens.
- Build a small form/layout primitives layer (stack/grid components) to ensure consistent responsive spacing without ad-hoc widths.
- Provide a design-system docs site (Storybook docs MDX or Docusaurus) explaining usage, dos/don’ts, and interaction patterns.

## 6) Trade-offs and limitations
- Responsiveness: Some components currently use fixed widths/heights to match the spec; I’d refactor toward fluid sizing (e.g., h-auto, aspect-*, responsive constraints) to improve behavior on smaller viewports.

- Token generation: Token regeneration is manual (npm run tokens). A CI job (and/or pre-commit) should validate the token schema and fail builds if generated outputs are out of date or diffs aren’t committed.

- Testing: Validation is primarily via Storybook. Next steps would be unit + interaction tests (Storybook test runner / RTL), plus automated accessibility checks (axe/a11y addon) and optional visual regression.

- Theming: Theming is driven by data-theme at the container level. This supports global brand switching, but there’s no per-component override API today; that could be added if needed via scoped theme wrappers/providers.

- Production hardening: Not yet optimized/verified for performance and scaling concerns (bundle size budgets, tree-shaking, CSS size, and strategies for multi-brand token delivery/dynamic loading).

## AI usage note
I used ChatGPT and Claude as a support tool during development. It was mainly used to clarify concepts, sanity-check implementation approaches, and help refine explanations and documentation.

All architectural decisions, component implementation, styling, and integration were designed and written by me. AI was not used to generate final production code without review; any suggestions were adapted and validated manually.