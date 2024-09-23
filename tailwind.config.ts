import type { Config } from 'tailwindcss'

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
        'white': '#ffffff',
        'black': '#000000',
        'black-pearl': '#030014',
        'gray-500': '#0300145e',
        'black-pearl-27': '#03001427',
        'purple-heart': '#7042f8',
        'purple-heart-61': '#7042f861',
        'purple-heart-8b': '#7042f88b',
        'purple-500': '#2A0E61',
        'electric-violet': '#b49bff',
        'cyan-500': '#00f7ff',
      }
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, generator: string) => void }) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
  }
  ],
}
export default config
