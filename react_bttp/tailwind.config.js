module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        'tertiary-dark': 'var(--color-tertiary-dark)',
        neutralW:'var(--color-neutral-w)',
        neutralB:'var(--color-neutral-b)',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
