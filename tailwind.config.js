/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables dark mode via class strategy
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './components/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
