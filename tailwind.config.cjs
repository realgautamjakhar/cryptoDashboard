/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#736CED",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
