import React from "react";
import { Link, useNavigate } from "react-router-dom";
import juveLogo from "../../img/header/juve_logo.png";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../contentPage/member/authSlice";
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
                    <a href="/member/join">회원가입</a>
                  </li>
                  <li>
                    <a href="/member/login">로그인</a>
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
                      <a href="/board/notice/list">공지사항</a>
                    </li>
                    <li style={{ display: "block" }}>
                      <a href="/board/consult/list">문의게시판</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="/member/mypage/myorder">마이페이지</a>
              </li>
              <li>장바구니</li>
            </ul>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Header;
