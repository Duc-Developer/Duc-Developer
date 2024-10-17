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
        'astronaut-gradient': 'linear-gradient(135deg, rgba(50, 50, 150, 0.8), rgba(100, 150, 200, 0.8))',
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
