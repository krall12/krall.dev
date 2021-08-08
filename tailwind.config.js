module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      mono: ['Hack', 'mono'],
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(1px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.125s ease-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
