import React from "react";
import "./login.css";

export const LoginUnsigned = () => {
  return (
    <>
      <table id="loginTbl" border={1}>
        <tr>
          <td>회원 로그인</td>
          <td>비회원 주문조회</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input placeholder="주문자명" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input placeholder="핸드폰번호(-제외)" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input placeholder="주문번호" />
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>확인</button>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>회원가입</button>
          </td>
        </tr>
      </table>
    </>
  );
};
