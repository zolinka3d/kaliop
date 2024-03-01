/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#2D3142",
        white: "#FFFFFF",
        light: "#dbd3d8",
        gray: "#BFC0C0",
        primary: "#4F5D75",
        alert: "#EF8354",
      },
    },
  },
  plugins: [],
};
