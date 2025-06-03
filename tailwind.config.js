/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1366px" },
      xl: { max: "1028px" },
      lg: { max: "998px" },
      md: { max: "767px" },
      xs: { max: "639px" },
    },
    extend: {
      colors: {
        "primary": "#f42619",
      }
    },
  },
  plugins: [],
}

