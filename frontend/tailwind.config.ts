import { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { info } from 'console';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['lemonade'],
          primary: '#4D6E74',
          secondary: '#D0B77A',
        },
      },
    ],
  },
};

export default config;
