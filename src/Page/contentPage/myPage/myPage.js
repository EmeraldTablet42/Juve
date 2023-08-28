import React from "react";
import { Link } from "react-router-dom";
import "./myPage.css";
import MyPageContentAreaRoutes from "./myPageContentAreaRoutes";

const MyPage = () => {
  return (
    <>
      <div className="myPage_layout">
        <div className="myPage_left">
          <p className="left_title">마이페이지</p>
          <ul style={{listStyle:"none"}}>
            <li><Link to="/member/mypage/order">주문 내역</Link></li>
            <li><Link to="/member/mypage/order">배송지 관리</Link></li>
            <li><Link to="/member/mypage/order">찜 상품</Link></li>
            <li><Link to="/member/mypage/order">마일리지</Link></li>
            <li><Link to="/member/mypage/order">1:1 문의</Link></li>
            <li><Link to="/member/mypage/myInfo">개인정보 변경</Link></li>
          </ul>
        </div>
        <div className="myPageContentArea">
            <MyPageContentAreaRoutes/>
        </div>
      </div>
    </>
  );
};

export default MyPage;
