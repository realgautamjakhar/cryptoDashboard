import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./Context/ThemeContext";
import Dashboard from "./container/Dashboard";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
