# RabbitQA — marketing website

Standalone Vite + React 19 + Tailwind v4 + Framer Motion site.

```bash
npm install
npm run dev      # http://localhost:5190
npm run build
```

## Structure
- `src/components/LiveScreen.jsx` — the "screen recording" player: animates camera, cursor, clicks, highlight rings and toasts over real screenshots.
- `src/data/scenes.js` — scene scripts (all coordinates are % of the screenshot, time is 0→1 per scene).
- `src/data/modules.js` — module/agent copy used across nav, grid, industries.
- `public/shots/*.webp` — product screenshots (2× retina, 1512×789 frame, names/customers masked).

## Adding a module screenshot
1. Capture 4 quadrant zooms of the app window in Chrome (saved to disk).
2. `raw/grab.sh <name>` stitches the 4 newest captures into `public/shots/<name>.webp`.
3. Add a scene to `SCENES` and reference it from the module's `scenes` array in `modules.js` —
   the module card gets a preview and a "Watch it live" link automatically.
# rabbitqa-web
