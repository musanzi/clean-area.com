/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', '../src/dist/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/assets/images/hero.webp")',
        about: 'url("/assets/images/about.webp")',
        footer: 'url("/assets/images/footer.png")'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
};
