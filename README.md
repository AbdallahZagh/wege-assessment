# WEGE Product Gallery

Next.js web app + Expo mobile app. Same 12 products, color variants, image viewer with pinch-zoom.

## Live demos

- **Web:** https://wege-assessment.vercel.app/
- **Mobile (Android APK):** https://expo.dev/artifacts/eas/RnVZeSy-kfH8oxyj82yt8lLOBmMchdRDO9Iq1dwN5EM.apk

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

## Completed

- 12 products with varying image counts per color variant
- Product cards: 3.5:6 frame, favorite, name, price / old price, color swatches
- Color switch updates card image without reload; selected color persists after viewer close
- Image viewer for selected color only; swipe (mobile web + Android) and pinch-zoom + pan
- Loading skeletons and broken-image fallback
- TypeScript throughout; per-card state in `useProductCardState`
- Live demos: Vercel web + EAS Android APK

## Trade-offs

- No Figma supplied; layout and tokens approximated from the brief (`shared/theme.css`)
- Placeholder studio-color images (generated from templates), not photography
- Web and mobile UI are separate implementations (different primitives)
- Android preview APK only; no iOS build
- APK is ~162 MB because 65 product images are bundled in the app

## Time spent

About 6 hours (scaffold, shared data, web gallery, Expo app, theming, deploy).
