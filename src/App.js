import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoute } from "./route/appRoute";

function App() {
  return (
    <div className="App">
      <AppRoute />
      <ToastContainer />
    </div>
  );
}

export default App;
