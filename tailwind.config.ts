import type { Config } from 'tailwindcss';
import { ASTRONAUT_PALETTE, COLORS } from './theme.variables';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '100%': { transform: 'translateY(0)' },
          '0%': { transform: 'translateY(200%)' },
        },
      },
      animation: {
        float300: 'float 0.3s ease-in-out',
      },
      backgroundImage: {
        'astronaut-gradient': 'linear-gradient(135deg, rgba(50, 50, 150, 0.8), rgba(100, 150, 200, 0.8))',
        },
      colors: {
        ...COLORS,
        ...ASTRONAUT_PALETTE
      },
      backdropFilter: {
        'blur15': 'blur(15px)',
      },
      backgroundColor: {
        'astronaut50': 'rgba(16,51,84,0.5)',
      },
      borderColor: {
        'astronaut25': 'rgba(16,51,84,0.25)',
      },
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
      fill: ['hover'],
      animation: ['hover'],
    },
  }
}
export default config
