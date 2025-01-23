/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,tsx,ts,jsx}', './blueprints/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  nativewind: {
    cssInterop: true,
  },
  plugins: [],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        background: 'var(--primary)',
        fixedBlack: 'var(--fixed-black)',
        fixedWhite: 'var(--fixed-white)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
      },
      fontFamily: {
        body: ['OpenSansLight', 'sans-serif'],
        caption: ['OpenSansRegular', 'sans-serif'],
        heading: ['OpenSansSemiBold', 'sans-serif'],
        subheading: ['OpenSansRegular', 'sans-serif'],
        title: ['OpenSansBold', 'sans-serif'],
      },
    },
  },
}
