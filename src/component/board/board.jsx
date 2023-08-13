import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArticleList } from "./component/articleList";
import { Pagination } from "./component/pagination";
import { EditorButton } from "./component/editorButton";

import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export const Board = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    console.log("BOARD 렌더링!!!", isAuthenticated);
    const checkAuthentication = async () => {
      if (isAuthenticated) {
        navigate("/board"); // 인증된 상태라면 바로 대시보드로 이동
      } else {
        navigate("/home");
      }
    };
    checkAuthentication();
  }, []);

  return (
    <>
      <EditorButton />
      <ArticleList />
      <Pagination />
    </>
  );
};
