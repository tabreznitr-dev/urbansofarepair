// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      fontFamily : {
        cedarville: ["var(--font-cedarville)", "cursive"],
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};