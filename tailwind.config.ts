import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    extend: {
      colors: {
        primary: '#4722c9',
        secondary: '#9d8dbd',
        primaryBackground: '#1b1437',
      },
      backgroundImage: {
        site: 'url("/images/site-bg.svg")',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        screen: ['var(--font-special-elite)', 'sans-serif'],
        machine: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
