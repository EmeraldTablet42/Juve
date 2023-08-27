import React from "react";
import { Link } from "react-router-dom";
import juveLogo from "../../img/header/juve_logo.png";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../contentPage/member/authSlice";
const Header = () => {
  const auth = useSelector((state) => state.authindex);
  const myDispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("loginToken");
    myDispatch(setAuth({ isLogined: false, memberId: "" })); // 로그아웃 상태로 변경
  };

  return (
    <>
      <table id="header" border={0}>
        <tr>
          <td id="left" align="left">
            <input />
          </td>
          <td id="middle" align="center">
            <Link to="/">
              <img src={juveLogo} alt="juve Logo"></img>
            </Link>
          </td>
          <td id="right" align="right">
            {!auth.isLogined ? (
              <span className="loginButton">
                <Link to="/member/join">회원가입</Link>
                <Link to="/member/login">로그인</Link>
              </span>
            ) : (
              <span>
                {auth.memberId}님 환영합니다.
                <button onClick={handleLogout}>로그아웃</button>
              </span>
            )}
            <select>
              <option>공지사항</option>
              <option>문의게시판</option>
              <option>1:1문의</option>
            </select>
            <span>
              <Link to="/member/mypage/order">마이페이지</Link>
            </span>
            <span>장바구니</span>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Header;
