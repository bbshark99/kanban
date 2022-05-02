module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      colors: {
        'gray-100': '#EFF1F3',
      }
    },
  },
  // plugins: [require('@tailwindcss/typography')],
  variants: {
    extend: {},
  }
}
