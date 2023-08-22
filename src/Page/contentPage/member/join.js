import React, { useEffect, useState } from "react";
import redAsteriks from "../../../img/join/redAsteriks3.png";
import "./join.css";
import { TermsJuve } from "./termsJuve";
import ContractJuve from "./contractJuve";
import { validateId } from "./validation";
import { validatePw } from "./validation";
import { validateAll } from "./validation";
import { validateEmail } from "./validation";
import DaumPostcodeAPI from "./daumPostcodeAPI";
import axios from "axios";

const Join = () => {
  // 필수사항 이미지 컨테이너///////////////////////////////////
  const RedAs = () => (
    <img
      src={redAsteriks}
      alt="redAsteriks"
      width={8}
      style={{ verticalAlign: "middle" }}
    ></img>
  );
  ///////////////////////////////////////////////////////////////

  // 폼에 저장될 input값을 state에 저장
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  // 주소값을 담는 state, 객체형으로 addr1(우편번호), addr2(기본주소), addr3(상세주소) 가지고 있음
  const [addr, setAddr] = useState({
    addr1: "",
    addr2: "",
    addr3: "",
  });
  const phoneArr = ["010", "016", "017", "018", "019"];
  const [phone, setPhone] = useState({ phone1: "010", phone2: "", phone3: "" });
  const telArr = [
    "02",
    "031",
    "032",
    "033",
    "041",
    "042",
    "043",
    "044",
    "051",
    "052",
    "053",
    "054",
    "055",
    "061",
    "062",
    "063",
    "064",
    "0502",
    "0503",
    "0504",
    "0505",
    "0506",
    "0507",
    "05 08",
    "070",
    "010",
    "011",
    "016",
    "017",
    "018",
    "019",
  ];
  const [tel, setTel] = useState({ tel1: "02", tel2: "", tel3: "" });
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("0");
  const [birth, setBirth] = useState({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  // 주소창 팝업 state - 기존값 false//
  const [addrPopup, setAddrPopup] = useState(false);

  const handleAddrPopup = (data) => {
    setAddrPopup(!addrPopup);
  };

  // 유효성검사 메시지를 담는 state////////////////////////////////////////////
  const [verifyIdMsg, setVerifyIdMsg] = useState("");
  const [verifyPwMsg, setVerifyPwMsg] = useState("");
  const [verifyEmailMsg, setVerifyEmailMsg] = useState("");
  /////////////////////////////////////////////////////////////////////////////

  // 테이블 전체에 대한 키보드 이벤트 핸들러(숫자/한글 입력 구분용)//////////////////////
  const [keyEvent, setKeyEvent] = useState("");
  const handleKeyEvent = (e) => {
    const key = e.key;
    setKeyEvent(key);
    console.log(key);
  };
  ////////////////////////////////////////////////////////////////////////////////////////
  const handleId = (e) => {
    const newId = e.target.value;
    setId(newId);
    const validationId = validateId(newId);
    setVerifyIdMsg(validationId.msg);
    setIsAllValidate({ ...isAllValidate, id: validationId.validation });
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    const newPasswordConfim = e.target.value;
    setPasswordConfirm(newPasswordConfim);
    const validationPw = validatePw(password, newPasswordConfim);
    setVerifyPwMsg(validationPw.msg);
    setIsAllValidate({ ...isAllValidate, password: validationPw.validation });
  };
  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsAllValidate({ ...isAllValidate, name: Boolean(newName) });
  };
  const handleAddr = (e) => {
    const newAddr = { ...addr, [e.target.name]: e.target.value };
    setAddr(newAddr);
    setIsAllValidate({ ...isAllValidate, address: Boolean(newAddr.addr1) });
  };
  const handlePhone = (e) => {
    if (e.target.name === "phone1") {
      const newPhone = { ...phone, [e.target.name]: e.target.value };
      setPhone(newPhone);
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      const newPhone = { ...phone, [e.target.name]: e.target.value };
      setPhone(newPhone);
      setIsAllValidate({
        ...isAllValidate,
        phone: Boolean(newPhone.phone2 && newPhone.phone3),
      });
    }
  };
  const handleTel = (e) => {
    if (e.target.name === "tel1") {
      setPhone({ ...phone, [e.target.name]: e.target.value });
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      setTel({ ...tel, [e.target.name]: e.target.value });
    }
  };
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationEmail = validateEmail(newEmail);
    setVerifyEmailMsg(validationEmail.msg);
    setIsAllValidate({ ...isAllValidate, email: validationEmail.validation });
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleBirth = (e) => {
    setBirth({ ...birth, [e.target.name]: e.target.value });
  };

  // 이용약관 check상태를 담는 state///////////////////////////////////////////
  const [allTermsAgreed, setAllTermsAgreed] = useState(false);
  const [requireInfoAgreed, setRequireInfoAgreed] = useState(false);
  const [personalInfoAgreed, setPersonalInfoAgreed] = useState(false);

  // 개별 동의항목이 변경될때마다 전체 동의 항목의 상태를 바꿔야함
  useEffect(() => {
    const isChecked = requireInfoAgreed && personalInfoAgreed;
    setAllTermsAgreed(isChecked);
    setIsAllValidate({ ...isAllValidate, terms: isChecked });
  }, [requireInfoAgreed, personalInfoAgreed]);

  // 이용약관 체크박스 핸들러
  const handleAllagree = () => {
    const isChecked = !allTermsAgreed;
    setAllTermsAgreed(isChecked);
    setRequireInfoAgreed(isChecked);
    setPersonalInfoAgreed(isChecked);
  };

  const handleRequireInfoAgree = () => {
    setRequireInfoAgreed(!requireInfoAgreed);
    if (!personalInfoAgreed) {
      setAllTermsAgreed(false);
    }
  };

  const handlePersonalInfoAgree = () => {
    setPersonalInfoAgreed(!personalInfoAgreed);
    if (!requireInfoAgreed) {
      setAllTermsAgreed(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////

  //폼 전송 전 최종 유효성 검사///////////////////////////////////////////////////////////////////////
  const [isAllValidate, setIsAllValidate] = useState({
    id: false,
    password: false,
    name: false,
    address: false,
    phone: false,
    email: false,
    terms: false,
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //폼전송////////////////////////////////////////////////////////////////////////////////////////////

  // 폼데이터 객체 만들고 input값 폼데이터에 추가
  const fd = new FormData();
  fd.append("id", id);
  fd.append("password", password);
  fd.append("name", name);
  fd.append("address", addr.addr1 + "^" + addr.addr2 + "^" + addr.addr3);
  fd.append("phone", phone.phone1 + "-" + phone.phone2 + "-" + phone.phone3);
  fd.append("tel", tel.tel1 + "-" + tel.tel2 + "-" + tel.tel3);
  fd.append("email", email);
  fd.append("gender", gender);
  fd.append(
    "birth",
    birth.birthYear +
      "-" +
      birth.birthMonth.padStart(2, "0") +
      "-" +
      birth.birthDay.padStart(2, 0)
  );
  fd.append("mileage", 0);

  // axios를 통한 폼데이터 백엔드에 전송
  const reg = () => {
    const validAll = validateAll(isAllValidate);
    if (validAll.validation) {
      axios.post("http://localhost:8080/member/reg", fd).then((res) => {
        console.log(isAllValidate.terms);
        alert("성공");
      });
    } else {
      alert(validAll.msg);
      console.log(isAllValidate.terms);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <h2 id="joinTitle">회원가입</h2>
      <h3>기본정보</h3>
      <p className="required">
        <RedAs /> 필수입력사항
      </p>
      <table id="basicInfo" className="joinTbl" onKeyDown={handleKeyEvent}>
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
            <span id="pwDetail">
              {" "}
              (영문 대소문자 조합 + 숫자/특수문자 중 2가지 이상 조합, 10자~16자)
            </span>
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
            <span className="verifyMsg"> {verifyPwMsg}</span>
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
              value={addr.addr1}
              onChange={handleAddr}
              readOnly
            />
            <button onClick={handleAddrPopup}>주소 검색</button>
            {addrPopup && (
              <DaumPostcodeAPI
                addr={addr}
                setAddr={setAddr}
                addrPopup={addrPopup}
                setAddrPopup={setAddrPopup}
                isAllValidate={isAllValidate}
                setIsAllValidate={setIsAllValidate}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="addr2"
              placeholder="기본주소"
              value={addr.addr2}
              onChange={handleAddr}
              readOnly
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="addr3"
              placeholder="상세주소"
              value={addr.addr3}
              onChange={handleAddr}
            />
          </td>
        </tr>
        <tr>
          <th className="col1">
            휴대전화
            <RedAs />
          </th>
          <td>
            {/* <input name="phone1" value={phone.phone1} onChange={handlePhone} /> */}
            <select name="phone1" value={phone.phone1} onChange={handlePhone}>
              {phoneArr.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>{" "}
            -{" "}
            <input
              name="phone2"
              maxLength={4}
              value={phone.phone2}
              onChange={handlePhone}
            />{" "}
            -{" "}
            <input
              name="phone3"
              maxLength={4}
              value={phone.phone3}
              onChange={handlePhone}
            />
            <div>
              {phone.phone1}-{phone.phone2}-{phone.phone3}
            </div>
          </td>
        </tr>
        <tr>
          <th className="col1">일반전화</th>
          <td>
            {/* <input name="tel1" value={tel.tel1} onChange={handleTel} /> */}
            <select name="tel1" value={tel.tel1} onChange={handleTel}>
              {telArr.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            -{" "}
            <input
              name="tel2"
              maxLength={4}
              value={tel.tel2}
              onChange={handleTel}
            />{" "}
            -{" "}
            <input
              name="tel3"
              maxLength={4}
              value={tel.tel3}
              onChange={handleTel}
            />
          </td>
        </tr>
        <tr>
          <th className="col1">
            이메일
            <RedAs />
          </th>
          <td>
            <input name="email" value={email} onChange={handleEmail} />
            <span className="verifyMsg"> {verifyEmailMsg}</span>
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
            <input
              name="birthYear"
              id="birthYear"
              value={birth.birthYear}
              onChange={handleBirth}
            />{" "}
            년{" "}
            <input
              name="birthMonth"
              value={birth.birthMonth}
              id="birthMonth"
              onChange={handleBirth}
            />{" "}
            월{" "}
            <input
              name="birthDay"
              value={birth.birthDay}
              id="birthDay"
              onChange={handleBirth}
            />{" "}
            일{" "}
          </td>
        </tr>
      </table>
      <h3>약관 동의</h3>
      <div id="agreeAll" className="terms">
        <label>
          <input
            type="checkbox"
            checked={allTermsAgreed}
            onChange={handleAllagree}
          />{" "}
          이용약관 및 개인정보수집 및 이용에 모두 동의합니다.
        </label>
      </div>
      <div id="requireInfo" className="terms">
        [필수] 이용약관 동의
        <p />
        <TermsJuve />
        <p />
        <label>
          이용약관에 동의하십니까?{" "}
          <input
            type="checkbox"
            checked={requireInfoAgreed}
            onChange={handleRequireInfoAgree}
          />{" "}
          동의함
        </label>
      </div>
      <div id="personalInfo" className="terms">
        [필수] 이용약관 동의
        <p />
        <ContractJuve />
        <p />
        <label>
          개인정보 수집 및 이용에 동의하십니까?{" "}
          <input
            type="checkbox"
            checked={personalInfoAgreed}
            onChange={handlePersonalInfoAgree}
          />{" "}
          동의함
        </label>
      </div>
      <div id="joinBtn">
        <button onClick={reg}>회원가입</button>
      </div>
    </>
  );
};

export default Join;
