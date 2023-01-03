/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#F4F6FF",
        dark: "#393E46",
        bgLightSecondary: "#EEF2FF",
        bgDarkSecondary: "#222222",
        lightPrimary: "#000000",
        lightSecondary: "#686D76",
        DarkPrimary: "#FFFFFF",
        DarkSecondary: "#EBEBEB",
        accent: "#736CED",
        red: "#FF5858",
        green: "#86C8BC",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
