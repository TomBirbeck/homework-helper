/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'universe': "url('/src/assets/universe.jpg')",
        'tree': "url('/src/assets/tree.jpg')",
        'boat': "url('/src/assets/boat.jpg')",
        'aurora': "url('/src/assets/aurora.jpg')",
        'ruin': "url('/src/assets/ruin.jpg')",
      }
    },
  },
  plugins: [],
}
