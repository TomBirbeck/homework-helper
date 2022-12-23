/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'universe': "url('/src/assets/space.jpg')",
        'tree': "url('/src/assets/tree.jpg')",
        'stream': "url('/src/assets/stream.jpg')",
        'aurora': "url('/src/assets/aurora.jpg')",
        'ruin': "url('/src/assets/ruin.jpg')",
      }
    },
  },
  plugins: [],
}
