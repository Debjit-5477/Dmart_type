/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f8ff',
          100: '#cceeff',
          200: '#99ddff',
          300: '#66ccff',
          400: '#33bbff',
          500: '#00aaff',
          600: '#0088cc',
          700: '#006699',
          800: '#004466',
          900: '#002233',
        },
        secondary: {
          100: '#e0d2f5',
          200: '#c2a6eb',
          300: '#a379e0',
          400: '#854dd6',
          500: '#6621cc',
          600: '#521aa3',
          700: '#3f147b',
          800: '#2b0d52',
          900: '#180729',
        },
        success: {
          100: '#d0f8d0',
          500: '#28a745',
          700: '#1e7e34',
        },
        warning: {
          100: '#fff3cd',
          500: '#ffc107',
          700: '#d39e00',
        },
        danger: {
          100: '#f8d7da',
          500: '#dc3545',
          700: '#bd2130',
        },
        info: {
          100: '#d1ecf1',
          500: '#17a2b8',
          700: '#117a8b',
        },
        dark: {
          50: '#e6eeff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a3ff',
          400: '#3384ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
          950: '#0b101b',
        },
        navy: {
          700: '#0c1425',
          800: '#0a1021',
          900: '#080c1d',
          950: '#060818',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        card: '0.5rem',
      },
    },
  },
  plugins: [],
};