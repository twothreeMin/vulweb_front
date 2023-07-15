import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./page/error-page";
import LoginPage from "./page/login";
import SignupPage from "./page/signup";
import DashBoardPage from "./page/dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/board" element={<DashBoardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
