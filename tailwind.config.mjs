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
        'sky-tint': '#F0F9FF',
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1EBE5D',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3069B4 0%, #2B4EA2 100%)',
        'cyan-gradient':
          'linear-gradient(135deg, #22D3EE 0%, #38BDF8 40%, #3069B4 100%)',
        'sky-gradient':
          'linear-gradient(135deg, #38BDF8 0%, #3069B4 100%)',
      },
    },
  },
  plugins: [],
};
