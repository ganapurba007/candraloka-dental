/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Medcity inspired healthcare palette — Distinctive Dental Care Blue + Deep Navy (No Tosca)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1e60d5', // Signature Dental Sapphire Blue
          600: '#174fb8',
          700: '#133f94',
          800: '#103275',
          900: '#0c2557',
          950: '#08183a',
        },
        navy: {
          50: '#f3f6fb',
          100: '#e4ecf7',
          200: '#cedef0',
          300: '#acc8e5',
          400: '#82abd6',
          500: '#628ec6',
          600: '#4c73b3',
          700: '#354f8e', // Medcity Secondary Blue
          800: '#1b3164', // Medcity Mid Navy
          900: '#0e204d', // Medcity Deep Dark Navy
          950: '#081330',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#354f8e',
          800: '#1b3164',
          900: '#0e204d',
        },
        surface: {
          50: '#f8fafc',
          100: '#f4f6fa', // Medcity soft background
          200: '#eaedf5',
          300: '#dce1ee',
          DEFAULT: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(14, 32, 77, 0.06)',
        'card-hover': '0 12px 28px -4px rgba(14, 32, 77, 0.12), 0 6px 12px -4px rgba(14, 32, 77, 0.05)',
      },
    },
  },
  plugins: [],
}
