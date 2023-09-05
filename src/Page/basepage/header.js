import React from "react";
import { Link, useNavigate } from "react-router-dom";
import juveLogo from "../../img/header/juve_logo.png";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../contentPage/member/authSlice";
import Cart from "../contentPage/categorypage/cart/cart";
const Header = () => {
  const auth = useSelector((state) => state.authindex);
  const myDispatch = useDispatch();
  const navi = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loginToken");
    myDispatch(setAuth({ isLogined: false, memberId: "" })); // 로그아웃 상태로 변경
    // window.location.replace("/");
    navi("/");
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
            <ul>
              {!auth.isLogined ? (
                <>
                  <li>
                    <Link to="/member/join">회원가입</Link>
                  </li>
                  <li>
                    <Link to="/member/login">로그인</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>{auth.memberId}님 환영합니다.</li>
                  <li>
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                </>
              )}
              <li>
                <div>
                  고객센터
                  <ul style={{ position: "absolute" }}>
                    <li style={{ display: "block" }}>
                      <Link to="/board/notice/list">공지사항</Link>
                    </li>
                    <li style={{ display: "block" }}>
                      <Link to="/board/consult/list">문의게시판</Link>
                    </li>
                  </ul>
                </div>
              </li>
              {auth.memberId === "adminjuve" ? (
                <li>
                  <Link to="/admin/main">관리자페이지</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/member/mypage/myorder">마이페이지</Link>
                  </li>
                  <li>
                    <Link to="/cart">장바구니</Link>
                  </li>
                </>
              )}
            </ul>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Header;
