/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3069B4',
          dark: '#2B4EA2',
        },
        neutral: {
          light: '#FAFAFA',
          dark: '#232323',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3069B4 0%, #2B4EA2 100%)',
      },
    },
  },
  plugins: [],
};
