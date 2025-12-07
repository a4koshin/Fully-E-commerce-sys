/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#06be5f',
        charcoal: '#111827',
        slate: '#6b7280',
        muted: '#f3f4f6',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(6, 190, 95, 0.25)',
      },
    },
  },
  plugins: [],
}

