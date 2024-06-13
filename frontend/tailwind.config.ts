import { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { error } from 'console';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lemonade: {
          ...require('daisyui/src/theming/themes')['lemonade'],
          primary: '#4D6E74',
          secondary: '#D0B77A',
          accent: '',
          neutral: '',
          info: '',
          success: '#B2C9AB',
          warning: '#F0D97E',
          error: '#E18989',
        },
      },
    ],
  },
};

export default config;
