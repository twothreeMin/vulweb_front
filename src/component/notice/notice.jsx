import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NoticeList } from "./component/noticeList";
import { NoticeEditorButton } from "./component/noticeEditorButton";

import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export const Notice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    console.log("BOARD 렌더링!!!", isAuthenticated);
    const checkAuthentication = async () => {
      if (isAuthenticated) {
        navigate("/notice"); // 인증된 상태라면 바로 대시보드로 이동
      } else {
        navigate("/home");
      }
    };
    checkAuthentication();
  }, []);

  return (
    <>
      <NoticeEditorButton />
      <NoticeList />
      {/* <Pagination /> */}
    </>
  );
};
