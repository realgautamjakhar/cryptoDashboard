import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState("light");
  const handleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      settheme("light");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      settheme("dark");
    }
  };

  // useEffect(() => {
  //   if (
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, []);
  return (
    <ThemeContext.Provider value={{ theme, settheme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
