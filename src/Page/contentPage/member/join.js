import React from "react";
import "./join.css";
import redAsteriks from "../../../img/join/redAsteriks3.png";

const Join = () => {
  // const tel = []
  const RedAs = () => (
    <img
      src={redAsteriks}
      alt="redAsteriks"
      width={8}
      style={{ verticalAlign: "middle" }}
    ></img>
  );

  return (
    <>
      <form>
        <h2 id="joinTitle">회원가입</h2>
        <h3>기본정보</h3>
        <p className="required">
          <RedAs /> 필수입력사항
        </p>
        <table id="basicInfo" className="joinTbl">
          <tr>
            <th className="col1">
              아이디
              <RedAs />
            </th>
            <td>
              <input name="id" />
              <span id="idDetail">(영문소문자/숫자,4~16자)</span>{" "}
              <button>아이디 중복 확인</button>
            </td>
          </tr>
          <tr>
            <th className="col1">
              비밀번호
              <RedAs />
            </th>
            <td>
              <input name="password" type="password" />
            </td>
          </tr>
          <tr>
            <th className="col1">
              비밀번호 확인
              <RedAs />
            </th>
            <td>
              <input name="passwodConfirm" type="password" />
            </td>
          </tr>
          <tr>
            <th className="col1">
              이름
              <RedAs />
            </th>
            <td>
              <input name="name" />
            </td>
          </tr>
          <tr>
            <th className="col1" rowSpan={3} valign="top">
              주소
              <RedAs />
            </th>
            <td>
              <input name="addr1" placeholder="우편번호" />
            </td>
          </tr>
          <tr>
            <td>
              <input name="addr2" placeholder="기본주소" />
            </td>
          </tr>
          <tr>
            <td>
              <input name="addr3" placeholder="상세주소" />
            </td>
          </tr>
          <tr>
            <th className="col1">
              휴대전화
              <RedAs />
            </th>
            <td>
              <input />
            </td>
          </tr>
          <tr>
            <th className="col1">일반전화</th>
            <td>
              <input />
            </td>
          </tr>
          <tr>
            <th className="col1">
              이메일
              <RedAs />
            </th>
            <td>
              <input />
            </td>
          </tr>
        </table>
        <h3>추가정보</h3>
        <table id="addInfo" className="joinTbl">
          <tr>
            <th>성별</th>
            <td>
              <label>
                <input name="gender" type="radio" value={1} />
                남성
              </label>
              <label>
                <input name="gender" type="radio" value={2} />
                여성
              </label>
            </td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>
              <input id="birthYear" /> 년 <input id="birthMonth" /> 월{" "}
              <input id="birthDay" /> 일{" "}
            </td>
          </tr>
        </table>
        <h3>약관 동의</h3>
        <div id="agreeAll" className="terms">
          <label>
            <input type="checkbox" /> 이용약관 및 개인정보수집 및 이용에 모두
            동의합니다.
          </label>
        </div>
        <div id="requireInfo" className="terms">
          [필수] 이용약관 동의
          <p />
          <textarea>이용 약관</textarea>
          <p />
          <label>
            이용약관에 동의하십니까? <input type="checkbox" /> 동의함
          </label>
        </div>
        <div id="personalInfo" className="terms">
          [필수] 이용약관 동의
          <p />
          <textarea>약관</textarea>
          <p />
          <label>
            개인정보 수집 및 이용에 동의하십니까? <input type="checkbox" />{" "}
            동의함
          </label>
          
        </div>
        <div id="joinBtn">
            <button>회원가입</button>
          </div>
      </form>
    </>
  );
};

export default Join;
