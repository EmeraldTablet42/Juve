import React from "react";
import juveLogo from "../../img/header/juve_logo.png";
import "./header.css"
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <table id="header" border={0}>
        <tr>
          <td id="left" align="left" >
            <input />
          </td>
          <td id="middle" align="center" >
            <img src={juveLogo} alt="juve Logo"></img>
          </td>
          <td id="right" align="right" >
            <button>회원가입</button>
            <Link to='/loginbutton'>로그인</Link>
            <select>
                <option>공지사항</option>
                <option>문의게시판</option>
                <option>1:1문의</option>
            </select>
                <span>마이페이지</span>
                <span>장바구니</span>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Header;
