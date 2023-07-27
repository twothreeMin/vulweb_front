import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/auth";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "../page/error-page";
import LoginPage from "../page/login";
import SignupPage from "../page/signup";
import { DashBoardPage } from "../page/dashBoardPage";

const AppRoutes = () => {
  console.log(`AppRoutes 렌더링`);
  const location = useLocation();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      checkAuth(); // 토큰이 있다면 인증 상태를 체크합니다.

      searchParams.delete("token");
      const newURL = `${window.location.protocol}//${window.location.host}${
        window.location.pathname
      }${searchParams.toString()}`;
      window.history.pushState({}, "", newURL);

      console.log(`AppRoutes useEffect !! : ${isAuthenticated}`);
    }
  }, [location, checkAuth]);

  console.log(`AppRoutes : ${isAuthenticated}`);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<LoginPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/board"
        element={isAuthenticated ? <DashBoardPage /> : <LoginPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export const AppRoute = () => {
  console.log(`AppRoute 렌더링`);

  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </div>
  );
};
