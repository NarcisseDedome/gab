/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gab: {
          navy: '#17324D',
          blue: '#245A7A',
          light: '#F5F7F9',
          white: '#FFFFFF',
          text: '#17212B',
          muted: '#64748B',
          green: '#16805C',
          orange: '#D97706',
          red: '#C2413B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(23, 33, 43, 0.05), 0 1px 2px 0 rgba(23, 33, 43, 0.03)',
        card: '0 4px 6px -1px rgba(23, 50, 77, 0.05), 0 2px 4px -1px rgba(23, 50, 77, 0.03)',
        modal: '0 20px 25px -5px rgba(23, 32, 45, 0.1), 0 10px 10px -5px rgba(23, 32, 45, 0.04)',
      }
    },
  },
  plugins: [],
}
