import React from "react";

const NoticeGet = () => {
  const regNotice = () => {
    window.location.replace("/board/notice/reg");
  };

  return (
    <>
      <h2>공지사항 게시판</h2>
      <button onClick={regNotice}>공지사항 등록</button>
    </>
  );
};

export default NoticeGet;
