export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a4a4a',
        accent: '#0066cc',
      },
      spacing: {
        '18': '4.5rem',
      },
      maxWidth: {
        'prose': '65ch',
      },
    },
  },
  plugins: [],
}
