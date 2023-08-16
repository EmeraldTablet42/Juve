import React from "react";
import "./join.css";

const Join = () => {
  // const tel = []
  return (
    <>
      <table id="signinTbl" border={1}>
        <tr>
          <td>회원가입</td>
        </tr>
      </table>
      <table>
        <tr>
          <td>기본정보</td>
        </tr>
        <tr>
          <td className="col1">아이디</td>
          <td>
            <input name="id" />
            <span id="idDetail">(영문소문자/숫자,4~16자)</span>{" "}
            <button>아이디 중복 확인</button>
          </td>
        </tr>
        <tr>
          <td className="col1">비밀번호</td>
          <td>
            <input name="password" type="password" />
          </td>
        </tr>
        <tr>
          <td className="col1">비밀번호 확인</td>
          <td>
            <input name="passwodConfirm" type="password" />
          </td>
        </tr>
        <tr>
          <td className="col1">이름</td>
          <td>
            <input name="name" />
          </td>
        </tr>
        <tr>
          <td className="col1">주소</td>
          <td>
            <input name="addr1" placeholder="우편번호" />
          </td>
        </tr>
        <tr>
          <td className="col1"></td>
          <td>
            <input name="addr2" placeholder="기본주소" />
          </td>
        </tr>
        <tr>
          <td className="col1"></td>
          <td>
            <input name="addr3" placeholder="상세주소" />
          </td>
        </tr>
        <tr>
          <td className="col1">휴대전화</td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <td className="col1">일반전화</td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <td className="col1">이메일</td>
          <td>
            <input />
          </td>
        </tr>
      </table>
    </>
  );
};

export default Join;
