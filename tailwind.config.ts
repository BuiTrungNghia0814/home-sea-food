import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sand: {
          50: '#fefdf8',
          100: '#fef9e7',
          200: '#fdf0c4',
          300: '#fce49d',
          400: '#f9d56b',
          500: '#f5c542',
          600: '#d4a427',
          700: '#a67c1a',
          800: '#7d5e14',
          900: '#5c450f',
        },
        shell: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e8dfd2',
          300: '#d9cab5',
          400: '#c4ae91',
          500: '#b39878',
          600: '#9a7d5d',
          700: '#7d6349',
          800: '#5e4b37',
          900: '#44362a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
