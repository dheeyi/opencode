# AGENTS.md — Pokedex

Minimal React 19 + Vite 8 app. JSX only (no TypeScript, no tests).

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint on all `**/*.{js,jsx}` files |

## Conventions

- ESLint is the only formatter/linter. No Prettier, no stylelint.
- Components use `.jsx` extension, plain JS uses `.js`.
- Imports are named exports (no default exports except pages).
- CSS per component (e.g. `App.css`), globals in `src/index.css`.
- `strictMode` is enabled in `src/main.jsx:8`.
- Vite config (`vite.config.js`) is minimal with just `@vitejs/plugin-react` (Oxc-based).
- `eslint.config.js` uses flat config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

## Entrypoints

- App: `src/main.jsx` → `src/App.jsx`
- Styles: `src/index.css` (global), `src/App.css` (component)
- Assets: `src/assets/` (images, SVGs), `public/` (static — favicon, icons.svg)
