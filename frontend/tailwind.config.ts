import { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#303030',
          secondary: '#58666e',
          accent: '#30A9A5',
          neutral: '#2d3748',
          'base-100': '#f7fafc',
          info: '#63b3ed',
          success: '#48bb78',
          warning: '#ecc94c',
          error: '#f56565',
        },
      },
    ],
  },
  plugins: [daisyui],
};

export default config;
