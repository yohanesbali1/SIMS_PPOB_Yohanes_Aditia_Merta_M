/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
        primary: "#f42619",
      },
      backgroundImage: {
        "cover-login": "url('./assets/i-login.png')",
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        fadeOut: 'fadeOut 0.3s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      }
    },
  },
  plugins: [],
};
