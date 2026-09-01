/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#F3EFE8",
        surface: "#FFFBF7",
        ink: "#1C1917",
        muted: "#8A8279",
        line: "#E4DCD0",
        sale: "#9B3D2A",
        overlay: "rgba(28,25,23,0.78)",
        skeleton: "#E8E0D4",
        fallback: "#EFE8DE",
      },
      spacing: {
        page: "20px",
        grid: "16px",
        meta: "6px",
        swatch: "8px",
      },
    },
  },
  plugins: [],
};
