# Copilot / AI Agent Instructions for Opvoedmaatje Frontend

This file gives targeted, actionable guidance for AI coding agents working on this repository.

1) Project overview
- Small single-page React app (Create React App / `react-scripts` v5).
- Main UI is implemented in `src/App.js` (single large component that contains all steps and local state).
- Entry point: `src/index.js` (uses `createRoot` to mount `App`).
- Static assets served from `public/` (e.g. `public/index.html`, referenced logo `/logo-opvoedmaatje.png`).

2) Big picture & data flow
- `App` holds top-level state: `children` (array) and `goals` (object). UI is step-based (1..3).
- Child components are simple functions inside `src/App.js`: `StepIndicator`, `WelcomeStep`, `FamilyStep`, `GoalStep`.
- Data flow example: `App` passes `children` and `setChildren` into `FamilyStep` which mutates the array locally (see `handleChange`, `addChild`, `removeChild`).
- Finish flow: `handleFinish` currently only `console.log`s and shows an `alert` — this is the integration point for sending data to a backend or to an Assistants API.

3) Key files to inspect for changes
- `src/App.js` — primary implementation and UI; frequent edits will go here.
- `src/index.js` — app bootstrap.
- `src/index.css` — global styles referenced by `App`.
- `public/index.html` — host HTML; assets referenced by `App` load relative to site root (e.g. `/logo-opvoedmaatje.png`).
- `package.json` — scripts: `npm start` (dev) and `npm run build` (production build).

4) Build / run / debug commands (Windows PowerShell)
- Start dev server: `npm install; npm start` (runs `react-scripts start`).
- Create production build: `npm run build` (outputs `build/`).
- Debugging tip: use browser DevTools while `npm.start` is running; look for `console.log` output from `handleFinish` in `src/App.js`.

5) Project-specific conventions & patterns
- Many UI strings and comments are in Dutch — preserve locale when editing labels or text.
- The app currently favors inline styles (JS objects) inside components instead of CSS modules or styled-components — follow existing inline style patterns for consistency when making small UI changes.
- Component structure: `src/App.js` contains multiple components in a single file (not split into separate files yet). When adding new components, prefer creating new files in `src/` only if size/complexity grows.
- Max children is enforced in UI (`if (children.length >= 5) return;`) — maintain this limit where relevant.

6) External dependencies & integration points
- Dependencies in `package.json`: `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/*`, `react-scripts`.
- Note: `@mui/material` is installed but the current code does not use MUI components — be conservative when introducing MUI; prefer small incremental adoption and keep visual parity.
- No backend calls are present; the obvious integration point is `handleFinish` in `src/App.js` (add API call or local persistence here).

7) Tests and CI
- There are no tests in the repository currently. README is minimal.
- The repo appears to have a CI/deploy step (README contains "trigger deploy") but no workflow files are present. If asked to modify CI, search for external workflows in upstream or ask the maintainer.

8) Quick examples (copyable)
- Read current children state in console: open browser console while running `npm start` and complete the steps; `handleFinish` prints `GEZIN:` and `DOELEN:`.
- Add a network call on finish (example location): edit `handleFinish` in `src/App.js` and replace `console.log(...)` with `fetch('/api/save', {method:'POST', body: JSON.stringify({children, goals})})` (endpoint and error handling must be added by dev).

9) When editing, avoid these mistakes
- Do not move strings from Dutch to English without confirmation — translations are product-level decisions.
- Avoid introducing global CSS that conflicts with `index.css` or inline styles; the UI relies on the existing layout and spacing in `App.js`.

10) Questions for maintainers (ask before making these changes)
- Should user data be persisted remotely or kept local-only? (there's a clear comment in `handleFinish` indicating future work)
- Are we allowed to introduce MUI components, or should UI remain plain React + inline styles?

If anything above is unclear, tell me which area (build, data flow, UI conventions) and I will expand with concrete code examples or make a draft change.
