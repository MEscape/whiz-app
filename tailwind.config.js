/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,tsx,ts,jsx}', './blueprints/**/*.{js,tsx,ts,jsx}'],
  darkMode: 'class',
  nativewind: {
    cssInterop: true,
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ':root': {
          '--accent': '#62a399',
          '--fixed-black': '#121212',
          '--fixed-white': '#FFFFFF',
          '--gray': '#6B7280',
          '--green': '#22C55E',
          '--red': '#EF4444',
        },
      }),
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        background: 'var(--primary)',
        black: 'var(--fixed-black)',
        gray: 'var(--gray)',
        green: 'var(--green)',
        primary: 'var(--primary)',
        red: 'var(--red)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        white: 'var(--fixed-white)',
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
