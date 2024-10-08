import type { Config } from 'tailwindcss';
import { COLORS } from './theme.variables';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...COLORS
      }
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, generator: string) => void }) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    }
  ],
  variants: {
    extend: {
      fill: ['hover']
    },
  }
}
export default config
