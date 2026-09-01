# WEGE Product Gallery

Next.js web app + Expo mobile app. Same 12 products, color variants, image viewer with pinch-zoom.

## Run

```bash
# web
cd web && npm install && npm run dev

# mobile
cd mobile && npm install && npx expo start
```

Web on a phone over Wi‑Fi: use your machine IP (`npm run dev` already binds `0.0.0.0`). If taps do nothing, add your IP to `NEXT_ALLOWED_DEV_ORIGINS` in `web/.env.local`.

## Repo layout

- `shared/` — types, products, theme tokens, product images
- `web/src/features/gallery/` — gallery UI (Next.js)
- `mobile/src/features/gallery/` — same features for RN (separate components, same layout)

Card state lives in `useProductCardState` per product. Viewer only shows images for the selected color.

## Images

Product PNGs are under `shared/assets/products/`. Regenerate from templates:

```bash
python shared/recolor-products.py
```

## Libraries

- Web: `react-zoom-pan-pinch`
- Mobile: `react-native-gesture-handler`, `react-native-reanimated`, `expo-image`, `react-native-svg`, NativeWind
