/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#736CED",
        red: "#FF5858",
        green: "#86C8BC",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
