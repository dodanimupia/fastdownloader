/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141316',
        mist: '#f5f6ff',
        line: '#ebe9f4',
        accent: '#5b7cff',
        mint: '#33b889',
        lilac: '#000675',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(25, 24, 38, 0.08)',
        panel: '0 20px 80px rgba(25, 24, 38, 0.08)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top left, rgba(91, 124, 255, 0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(181, 140, 255, 0.14), transparent 28%)',
        haze: 'linear-gradient(180deg, rgba(247, 248, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
