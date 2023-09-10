/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: '#A484A9',
        purpler: '#7B0E90',
        purplerer: '#781462',
        purplerest: '#92509C',
      },
      font: {
        'fredoka': ['Fredoka', 'serif'],
        'fraunces': ['Fraunces', 'serif'],
      }
    },
  },
  plugins: [],
};
