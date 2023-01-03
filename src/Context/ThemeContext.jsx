import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState("light");
  const handleTheme = () => {
    if (theme === "dark") {
      settheme("ligth");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      settheme("dark");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, settheme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
