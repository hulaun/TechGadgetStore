/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary
        blueOcean: "#3669C9",
        orangeFresh: "#FDA429",
        navyBlack: "#13181F",
        white: "#FFFFFF",
        // Secondary
        earthGreen: "#3A9D7A",
        redVelvet: "#C93545",
        darkGrey: "#FAFAFA",
        halfGrey: "#838589",
        softGrey: "#EDEDED",
        offGrey: "#F8F8F8",
        // Label
        offBlue: "#EFF5FB",
        offGreen: "#EEFAF6",
        offRed: "#FCECEF",
      },
    },
  },
  plugins: [],
};
