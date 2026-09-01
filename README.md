# WEGE Product Gallery

Product gallery and color-variant experience for **Next.js (web)** and **Expo (React Native)**. Local mock data only. TypeScript throughout.

Design is approximated from the brief (no Figma was supplied): editorial fashion gallery, warm off-white canvas, 3.5:6 image frames, 6-column desktop / 2-column mobile.

## Setup

### Web

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build: `cd web && npm run build && npm run start`.

### Mobile

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go. A published EAS preview is required for the live mobile demo.

## Architecture

- `shared/` — product types, 12 products, template assets, `recolor-products.py` for image generation
- `web/` — Next.js App Router. Route files stay thin; UI lives in `src/features/gallery` and `src/components/ui`
- `mobile/` — Expo Router. Same feature split, NativeWind `className` styling

Variant, favorite, viewer, and image index live in `useProductCardState` (per card, not global). Changing color while the viewer is open resets to image 1, default zoom, and centered pan.

## Styling

- **Web:** Tailwind CSS v4 — `shared/theme.css` imported in `web/src/app/globals.css` `@theme`
- **Mobile:** NativeWind + `shared/theme.css` imported in `mobile/global.css`, mapped in `mobile/tailwind.config.js`

## Libraries

| Library | Where | Why |
|---|---|---|
| `react-zoom-pan-pinch` | Web | Pinch-zoom, pan, zoom-out relative to default crop |
| `react-native-gesture-handler` | Mobile | Pinch + pan composition |
| `react-native-reanimated` | Mobile | Animated zoom/pan values |
| `expo-image` | Mobile | Image loading/cache |
| NativeWind | Mobile | Tailwind `className` on RN views |

## Completed

- 12 products, varying image counts per color
- Product cards: 3.5:6 frame, favorite, name, price / old price, color swatches
- Color switch updates the card image without reload
- Viewer for the selected color only; close restores selected color
- Mobile web swipe + pinch via zoom library
- Expo finger swipe + real pinch-to-zoom and pan
- Loading skeleton and broken-image fallback
- TypeScript, no `any`

## Trade-offs / limitations

- Placeholder studio-color images (not photography). Replace templates under `shared/assets/templates` and re-run `python shared/recolor-products.py`
- Visual design tokens live in `shared/theme.css` (imported by web and mobile CSS)
- Web and native UI are duplicated on purpose (different primitives)
- Live Vercel / EAS URLs are not included until deploy

## Time spent

About 6 hours (scaffold, shared data, web gallery, Expo + NativeWind, README).
