/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#D14C01 !important',
        'custom-logout': '#8E0000',
        'custom-yellow': '#BD7E1B',
        'custom-red': '#A03E06',
        'custom-pencil': '#FFDD2B',
        'custom-delete': '#B30000',
        'custom-viewmore':'#FEC206'
      },
      boxShadow: {
        'bottom': "1px 2px 2px 0 rgba(0.1, 0.1, 0.1, 0.1)"
      }
    },
  },
  plugins: [],
}

