import React, { useState } from "react";
import redAsteriks from "../../../img/join/redAsteriks3.png";
import "./join.css";
import { TermsJuve } from "./termsJuve";
import ContractJuve from "./contractJuve";
import { validateId } from "./validation";

const Join = () => {
  const RedAs = () => (
    <img
      src={redAsteriks}
      alt="redAsteriks"
      width={8}
      style={{ verticalAlign: "middle" }}
    ></img>
  );

  // 폼에 저장될 input값을 state에 저장
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  const [verifyIdMsg, setVerifyIdMsg] = useState("");

  const handleId = (e) => {
    const idInput = e.target.value;
    setId(idInput);
    const validationMsg = validateId(idInput);
    setVerifyIdMsg(validationMsg);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAddr = (e) => {
    setAddr(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleTel = (e) => {
    setTel(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleBirth = (e) => {
    setBirth(e.target.value);
  };

  return (
    <>
      <form name="joinForm" action="/" method="post">
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
              <input name="id" maxLength={16} value={id} onChange={handleId} />
              <span id="idDetail"> (영문소문자/숫자,4~16자)</span>{" "}
              <span className="verifyMsg">{verifyIdMsg}</span>
            </td>
          </tr>
          <tr>
            <th className="col1">
              비밀번호
              <RedAs />
            </th>
            <td>
              <input
                name="password"
                type="password"
                maxLength={16}
                value={password}
                onChange={handlePassword}
              />
              <span id="pwDetail"> (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)</span>
            </td>
          </tr>
          <tr>
            <th className="col1">
              비밀번호 확인
              <RedAs />
            </th>
            <td>
              <input
                name="passwodConfirm"
                type="password"
                maxLength={16}
                value={passwordConfirm}
                onChange={handlePasswordConfirm}
              />
            </td>
          </tr>
          <tr>
            <th className="col1">
              이름
              <RedAs />
            </th>
            <td>
              <input name="name" value={name} onChange={handleName} />
            </td>
          </tr>
          <tr>
            <th className="col1" rowSpan={3} valign="top">
              주소
              <RedAs />
            </th>
            <td>
              <input
                name="addr1"
                placeholder="우편번호"
                value={addr}
                onChange={handleAddr}
              />
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
              <input name="phone" value={phone} onChange={handlePhone} />
            </td>
          </tr>
          <tr>
            <th className="col1">일반전화</th>
            <td>
              <input name="tel" value={tel} onChange={handleTel} />
            </td>
          </tr>
          <tr>
            <th className="col1">
              이메일
              <RedAs />
            </th>
            <td>
              <input name="email" value={email} onChange={handleEmail} />
            </td>
          </tr>
        </table>
        <h3>추가정보</h3>
        <table id="addInfo" className="joinTbl">
          <tr>
            <th>성별</th>
            <td>
              <label>
                <input
                  name="gender"
                  type="radio"
                  value={1}
                  onChange={handleGender}
                />
                남성
              </label>
              <label>
                <input
                  name="gender"
                  type="radio"
                  value={2}
                  onChange={handleGender}
                />
                여성
              </label>
            </td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>
              <input id="birthYear" value={birth} onChange={handleBirth} /> 년{" "}
              <input id="birthMonth" /> 월 <input id="birthDay" /> 일{" "}
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
          <TermsJuve />
          <p />
          <label>
            이용약관에 동의하십니까? <input type="checkbox" /> 동의함
          </label>
        </div>
        <div id="personalInfo" className="terms">
          [필수] 이용약관 동의
          <p />
          <ContractJuve />
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
