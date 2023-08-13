import { useMemberStore } from "../store/auth";

export const ManagerPage = () => {
  const memberInfo = useMemberStore((state) => state.member);
  console.log("ManagerPage!!", memberInfo);

  return (
    <>
      {memberInfo?.authority === "ROLE_MANAGER" ? (
        <>
          <h1>관리자 페이지입니다.</h1>
          <div>{memberInfo.name} 관리자님 어서오세요 </div>
        </>
      ) : (
        <div>관리자 권한이 없습니다.</div>
      )}
    </>
  );
};
