/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6366F1', // Indigo 500
        secondary: '#8B5CF6', // Violet 500
        accent: '#EC4899', // Pink 500
        background: '#1F2937', // Gray 800
        card: '#374151', // Gray 700
        text: '#F3F4F6', // Gray 100
        subtext: '#D1D5DB', // Gray 300
        border: '#4B5563', // Gray 600
      },
    },
  },
  plugins: [],
}
