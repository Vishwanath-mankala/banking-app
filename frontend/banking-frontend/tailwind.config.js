/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // 👈 Angular uses HTML + TS
  ],
  theme: {
    extend: {
      colors: {
        bank: {
          50: '#f0fdf6',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        emerald: {
          900: '#0a3a2a',
          800: '#0d5b43'
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl: '16px'
      }
    },
  },
  plugins: [],
}
