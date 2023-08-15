import React from "react";
import "./login.css"

const Login = () => {
  return (
    <>
      <table className="loginTbl" border={1}>
        <tr>
          <td>회원 로그인</td>
          <td>비회원 주문조회</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input placeholder="아이디" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input placeholder="비밀번호" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="checkbox" />
            아이디저장
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>로그인</button>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>회원가입</button>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a>아이디 찾기</a>
          </td>
          <td align="center">
            <a>비밀번호 찾기</a>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            ----간편하게 로그인----
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>네이버로 로그인</button>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>카카오로 로그인</button>
          </td>
        </tr>
      </table>
    </>
  );
};
export default Login;