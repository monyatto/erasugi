const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Zen Maru Gothic', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        disappear: {
          "0%": {opacity: 1},
          "100%": {opacity: 0},
        },
      },
      animation: {
        disappear: "disappear 3s ease 0s 1 forwards",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require("daisyui")
  ],
  daisyui: {
    themes: ["wireframe"]
  },
}
