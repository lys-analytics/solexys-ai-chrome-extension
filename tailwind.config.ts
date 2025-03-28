import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#E32D13',
        primary: '#E32D13',
        'primary-dark': '#C02510',
      },
    },
  },
  plugins: [],
};

export default config;
