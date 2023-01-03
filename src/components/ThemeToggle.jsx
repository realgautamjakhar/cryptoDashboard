import React from "react";
import { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { handleTheme, theme } = useContext(ThemeContext);
  return (
    <button
      className="px-4 py-2 transition-all duration-300 ease-in-out hover:scale-110"
      onClick={() => handleTheme()}
      name="Theme toggle button"
    >
      {theme === "dark" ? "Moon" : "Sun"}
    </button>
  );
};

export default ThemeToggle;
