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
import { BoardEditorPage } from "../page/boardEditorPage";
import { ManagerPage } from "../page/managerPage";

const AppRoutes = () => {
  console.log(`AppRoutes 렌더링`);
  const location = useLocation();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      searchParams.delete("token");
      const newURL = `${window.location.protocol}//${window.location.host}${
        window.location.pathname
      }${searchParams.toString()}`;
      window.history.pushState({}, "", newURL);
    }

    checkAuth(); // 페이지가 로드될 때마다 인증 상태를 체크합니다.
  }, [checkAuth]);

  if (isLoading) {
    return null; // 로딩 중일 때는 아무 것도 보여주지 않습니다
  }

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
      <Route
        path="/boardEditor"
        element={isAuthenticated ? <BoardEditorPage /> : <LoginPage />}
      />
      <Route
        path="/manager"
        element={isAuthenticated ? <ManagerPage /> : <LoginPage />}
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
