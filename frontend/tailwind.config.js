/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "custom-primary": "#2aa88f",
        "custom-secondary": "#207c6a",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
