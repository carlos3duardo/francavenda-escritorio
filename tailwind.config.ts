import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f8fd',
          100: '#e3effb',
          200: '#c1dff6',
          300: '#8ac5ef',
          400: '#4ca7e4',
          500: '#258cd2',
          600: '#1876bd',
          700: '#145990',
          800: '#144c78',
          900: '#164064',
          950: '#0f2942',
        },
        secondary: {
          50: '#fefde8',
          100: '#fffdc2',
          200: '#fff788',
          300: '#ffec45',
          400: '#fdd804',
          500: '#edc105',
          600: '#cd9601',
          700: '#a36a05',
          800: '#87530c',
          900: '#724411',
          950: '#432305',
        },
      },
    },
  },
  plugins: [],
};

export default config;
