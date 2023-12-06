/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'exterior-img': "url('./assets/images/exteriorModel.png')",
      },
      colors: {
        "background-primary" : '#1f1f1f',
        "background-secondary" : "#2d2d2d",
        "primary" : "#fea013",
        "primary-text" : "#cbcbcb",
        "de-active" : "#69563A",
        "border-primary" : "#494949",
        "hover-primary" : "#BA4A0C"

      },
      dropShadow: {
        '3xl': '5px 5px 8px rgb(0, 0, 0)',
        '4xl': [
            '10px 5px 32px rgb(0, 0, 0)',
            '10px 18px 18px rgba(0, 0, 0)',
            '30px 8px 15px rgba(0, 0, 0)',

        ]
      }
    },
  },
  plugins: [],
}

