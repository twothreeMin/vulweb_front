import { AppNavigate } from "../component/appNavigate";
import { Board } from "../component/board/board";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../util/authContext";

export const DashBoardPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  const navigate = useNavigate();

  console.log(`DashBoardPage 로그 : ${isAuthenticated}`);
  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <AppNavigate />
      <Board />
    </>
  );
};
