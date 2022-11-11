/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html",
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "#F3F3F3",
      "secondary": "#2EBC56",
      "default": "#ffffff"
    }
  },
  plugins: [],
}
