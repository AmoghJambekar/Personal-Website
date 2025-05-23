/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#0066cc',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#004999',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'inherit',
              fontWeight: '700',
            },
            code: {
              color: '#ef4444',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
            },
            'pre code': {
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
