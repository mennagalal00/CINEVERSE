/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e50914",
          dark: "#141414",
          card: "#1a1a1a",
          muted: "#6b6b6b",
          border: "#2a2a2a",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
