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
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#1b6b4a',
          800: '#166534',
          900: '#145231',
        },
        secondary: {
          DEFAULT: '#C9A84C',
          light: '#D4B563',
          dark: '#B89940',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        mauquf: '#F97316',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
