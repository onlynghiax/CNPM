/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        mist: "#E5E5E5",
        muted: "#A3A3A3",
        accent: {
          silver: "#C4C4C4",
          neon: "#4ADE80",
          "neon-dim": "#22C55E99"
        },
        surface: "#0A0A0A",
        elevated: "#111111",
        card: "#121212"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "ui-sans-serif", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      borderRadius: {
        minimal: "2px"
      },
      boxShadow: {
        soft: "0 8px 32px rgba(0, 0, 0, 0.45)",
        "soft-sm": "0 4px 16px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};
