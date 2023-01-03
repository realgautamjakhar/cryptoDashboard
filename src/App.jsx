import "./App.css";
import BarChart from "./Chart/BarChart";
import Charts from "./components/Charts";
import Exchange from "./components/Exchange";
import Market from "./components/Market";
import Search from "./components/Search";
import { AppContextProvider } from "./Context/AppContext";
import { Provider } from "react-redux";
import { store } from "./store";
import Portfolio from "./components/Portfolio";
function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <div className="gridLayout">
          <div className="search flex items-center justify-center">
            <Search />
          </div>
          <div className="marketcap">
            <Market />
          </div>
          <div className="chart">
            <Charts />
          </div>
          <div className="portfolio">
            <Portfolio />
          </div>
          <div className="exchange">
            <Exchange />
          </div>
        </div>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
