/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "var(--wege-color-canvas)",
        surface: "var(--wege-color-surface)",
        ink: "var(--wege-color-ink)",
        muted: "var(--wege-color-muted)",
        line: "var(--wege-color-line)",
        sale: "var(--wege-color-sale)",
        overlay: "var(--wege-color-overlay)",
        skeleton: "var(--wege-color-skeleton)",
        fallback: "var(--wege-color-fallback)",
      },
      fontSize: {
        eyebrow: "var(--wege-font-size-eyebrow)",
        body: "var(--wege-font-size-body)",
        price: "var(--wege-font-size-price)",
        "price-old": "var(--wege-font-size-price-old)",
        indicator: "var(--wege-font-size-indicator)",
        title: "var(--wege-font-size-title)",
        "icon-sm": "var(--wege-size-icon-sm)",
        "icon-md": "var(--wege-size-icon-md)",
      },
      lineHeight: {
        body: "var(--wege-line-height-body)",
        "body-tight": "var(--wege-line-height-body-tight)",
        "price-old": "var(--wege-line-height-price-old)",
      },
      letterSpacing: {
        eyebrow: "var(--wege-letter-spacing-eyebrow)",
      },
      spacing: {
        page: "var(--wege-spacing-page)",
        "page-lg": "var(--wege-spacing-page-lg)",
        grid: "var(--wege-spacing-grid)",
        meta: "var(--wege-spacing-meta)",
        swatch: "var(--wege-spacing-swatch)",
        card: "var(--wege-spacing-card)",
        "card-gap": "var(--wege-spacing-card-gap)",
        "header-y": "var(--wege-spacing-header-y)",
        "header-safe": "var(--wege-spacing-header-safe)",
        favorite: "var(--wege-spacing-favorite)",
        "viewer-x": "var(--wege-spacing-viewer-x)",
        "viewer-bottom": "var(--wege-spacing-viewer-bottom)",
        "grid-bottom": "var(--wege-spacing-grid-bottom)",
        "viewer-top": "var(--wege-spacing-viewer-top)",
        "indicator-gap": "var(--wege-spacing-indicator-gap)",
        "price-gap": "var(--wege-spacing-price-gap)",
      },
      width: {
        swatch: "var(--wege-size-swatch)",
        "icon-sm": "var(--wege-size-icon-sm)",
        "icon-md": "var(--wege-size-icon-md)",
        "icon-lg": "var(--wege-size-icon-lg)",
        "icon-xl": "var(--wege-size-icon-xl)",
        "btn-favorite": "var(--wege-size-btn-favorite)",
        "btn-close": "var(--wege-size-btn-close)",
        dot: "var(--wege-size-dot)",
      },
      height: {
        swatch: "var(--wege-size-swatch)",
        "icon-sm": "var(--wege-size-icon-sm)",
        "icon-md": "var(--wege-size-icon-md)",
        "icon-lg": "var(--wege-size-icon-lg)",
        "icon-xl": "var(--wege-size-icon-xl)",
        "btn-favorite": "var(--wege-size-btn-favorite)",
        "btn-close": "var(--wege-size-btn-close)",
        dot: "var(--wege-size-dot)",
      },
      borderRadius: {
        card: "var(--wege-radius-card)",
        full: "var(--wege-radius-full)",
      },
      maxWidth: {
        gallery: "var(--wege-max-width-gallery)",
      },
      aspectRatio: {
        product: "var(--wege-aspect-product-w) / var(--wege-aspect-product-h)",
      },
      boxShadow: {
        favorite: "var(--wege-shadow-favorite)",
      },
      keyframes: {
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
