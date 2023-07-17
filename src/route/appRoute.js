import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../util/authContext";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "../page/error-page";
import LoginPage from "../page/login";
import SignupPage from "../page/signup";
import { DashBoardPage } from "../page/dashBoardPage";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<LoginPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/board" element={<DashBoardPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export const AppRoute = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
      <ToastContainer />
    </div>
  );
};
