import { useState } from "react";
import { createContext } from "react";
import { fetchChartData } from "../api/api";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [baseCurrency, setbaseCurrency] = useState("usd");
  const [coinList, setcoinList] = useState();

  const [chartData, setchartData] = useState(
    fetchChartData("bitcoin", 30, "usd")
  );
  return (
    <AppContext.Provider
      value={{
        baseCurrency,
        setbaseCurrency,
        coinList,
        setcoinList,
        chartData,
        setchartData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
