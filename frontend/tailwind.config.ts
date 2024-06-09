import { Config } from 'tailwindcss';
import daisyui from 'daisyui';

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
        },
      },
    ],
  },
};

export default config;
