import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'body-background': '#f8f7fa',
        'body-background-dark': '#25293c',
        'component-background': '#ffffff',
        'component-background-dark': '#2f3349',
        border: '#e6e6e8',
        'border-dark': '#44485e',
        primary: {
          50: '#f2f9fd',
          100: '#e4f0fa',
          200: '#c2e1f5',
          300: '#8dcaec',
          400: '#50afe0',
          500: '#2995ce',
          600: '#1b78b0',
          700: '#175f8d',
          800: '#175175',
          900: '#184462',
          950: '#102b41',
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
