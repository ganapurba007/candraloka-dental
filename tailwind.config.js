/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Medcity inspired healthcare palette (Teal Turquoise + Deep Navy)
        primary: {
          50: '#edfbf9',
          100: '#d4f6f2',
          200: '#aceee6',
          300: '#76e1d6',
          400: '#42cdc2',
          500: '#21cdc0', // Signature Medcity Teal
          600: '#17a89e',
          700: '#16867f',
          800: '#176a66',
          900: '#175854',
          950: '#073533',
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
