import React from 'react';
import { Link } from 'react-router-dom';
import './myPage.css';
import MyPageContentAreaRoutes from './myPageContentAreaRoutes';

const MyPage = () => {
  return (
    <>
      <div className="myPage_layout">
        <div className="myPage_left">
          <ul className="left-ul" style={{ listStyle: 'none' }}>
            {/* <li><a href="/member/mypage/myOrder">주문 내역</a></li> */}
            <li>
              <Link to="/member/mypage/myorder">주문 내역</Link>
            </li>
            <li>
              <Link to="/member/mypage/myshipment">배송지 관리</Link>
            </li>
            <li>
              <Link to="/member/mypage/order">찜 상품</Link>
            </li>
            <li>
              <Link to="/member/mypage/order">마일리지</Link>
            </li>
            <li>
              <Link to="/member/mypage/order">1:1 문의</Link>
            </li>
            <li>
              <a href="/member/mypage/myinfo">개인정보 변경</a>
            </li>
            {/* <li><Link to="/member/mypage/myInfo">개인정보 변경</Link></li> */}
          </ul>
        </div>
        <div className="myPageContentArea">
          <MyPageContentAreaRoutes />
        </div>
      </div>
    </>
  );
};

export default MyPage;
