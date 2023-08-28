import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import redAsteriks from "../../../img/join/redAsteriks3.png";
import { useNavigate } from "react-router-dom";
import { validatePw } from "../member/validation";
import { validateAll } from "../member/validation";
import { validateEmail } from "../member/validation";
import { validateBirth } from "../member/validation";
import DaumPostcodeAPI from "../member/daumPostcodeAPI";

const MyInfo = () => {
  // 무언가 에러발생시 홈페이지로 리다이렉트//
  const navi = useNavigate();
  //// IdList, EmailList State 설정///
  const [dbList, setDdList] = useState({ idList: [], emailList: [] });
  //// IdList, EmailList 불러오기/////////////

  // const getDbList = () => {
  //   axios
  //     .get("http://localhost:8090/member/getIds")
  //     .then((res) => {
  //       setDdList((prevList) => ({ ...prevList, idList: res.data }));
  //     })
  //     .catch(() => {
  //       alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요");
  //       navi("/");
  //     });
  //   axios
  //     .get("http://localhost:8090/member/getEmails")
  //     .then((res2) => {
  //       setDdList((prevList) => ({ ...prevList, emailList: res2.data }));
  //     })
  //     .catch(() => {
  //       alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요");
  //       navi("/");
  //     });
  // };

  const getDbList = useCallback(() => {
    // 첫 번째 axios 요청
    const getIdsPromise = axios
      .get("http://localhost:8090/member/getIds")
      .then((res) => {
        setDdList((prevList) => ({ ...prevList, idList: res.data }));
      });

    // 두 번째 axios 요청
    const getEmailsPromise = axios
      .get("http://localhost:8090/member/getEmails")
      .then((res2) => {
        setDdList((prevList) => ({ ...prevList, emailList: res2.data }));
      });

    // 두 개의 axios 요청을 병렬로 실행하고 에러 처리
    Promise.all([getIdsPromise, getEmailsPromise]).catch(() => {
      alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요");
      navi("/");
    });
  }, [navi]);

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

  const [memberInfo, setMemberInfo] = useState({
    id: "",
    oldPassword: "",
    newPassword: "",
    newPasswordConfim: "",
    name: "",
    addr: { addr1: "", addr2: "", addr3: "" },
    phone: { phone1: "", phone2: "", phone3: "" },
    tel: { tel1: "", tel2: "", tel3: "" },
    email:"",
    gender: "",
    birth: { birthYear: "", birthMonth: "", birthDay: "" },
  });

  const telPhoneArr = {
    tel: [
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
    ],
    phone: ["010", "016", "017", "018", "019"],
  };
  // 주소창 팝업 state - 기존값 false//
  const [addrPopup, setAddrPopup] = useState(false);

  const handleAddrPopup = (data) => {
    setAddrPopup(!addrPopup);
  };

  // 유효성검사 메시지를 담는 state////////////////////////////////////////////
  const [verifuMsg, setVerifuMsg] = useState({
    pwMsg: "",
    emailMsg: "",
    birthMsg: "",
  });
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
    const newId = e.target.value.toLowerCase();
    setMemberInfo({ ...memberInfo, id: newId });
  };
  const handleOldPassword = (e) => {
    setMemberInfo({ ...memberInfo, oldPassword: e.target.value });
  };
  const handleNewPassword = (e) => {
    setMemberInfo({ ...memberInfo, newPassword: e.target.value });
  };
  const handleNewPasswordConfirm = (e) => {
    const newPasswordConfim = e.target.value;
    setMemberInfo({ ...memberInfo, newPasswordConfim: newPasswordConfim });
    const validationPw = validatePw(memberInfo.newPassword, newPasswordConfim);
    setVerifuMsg({ ...verifuMsg, pwMsg: validationPw.msg });
    setIsAllValidate({ ...isAllValidate, password: validationPw.validation });
  };
  const handleName = (e) => {
    const newName = e.target.value;
    setMemberInfo({ ...memberInfo, name: newName });
    setIsAllValidate({ ...isAllValidate, name: Boolean(newName) });
  };
  const handleAddr = (e) => {
    // const newAddr = { ...addr, [e.target.name]: e.target.value };
    const newAddr = {
      ...memberInfo,
      addr: { ...memberInfo.addr, [e.target.name]: e.target.value },
    };
    // setAddr(newAddr);
    setMemberInfo({ ...memberInfo, addr: newAddr });
    setIsAllValidate({
      ...isAllValidate,
      address: Boolean(memberInfo.addr.addr1),
    });
  };
  const handlePhone = (e) => {
    if (e.target.name === "phone1") {
      //   const newPhone = { ...phone, [e.target.name]: e.target.value };
      const newPhone = {
        ...memberInfo,
        phone: { ...memberInfo.phone, [e.target.name]: e.target.value },
      };
      setMemberInfo({ ...memberInfo, phone: newPhone });
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      const newPhone = {
        ...memberInfo,
        phone: { ...memberInfo.phone, [e.target.name]: e.target.value },
      };
      setMemberInfo({ ...memberInfo, phone: newPhone });
      setIsAllValidate({
        ...isAllValidate,
        phone: Boolean(
          memberInfo.phone.phone2 && memberInfo.phone.phone3
        ),
      });
    }
  };
  const handleTel = (e) => {
    if (e.target.name === "tel1") {
      //   setPhone({ ...phone, [e.target.name]: e.target.value });
      setMemberInfo({
        ...memberInfo,
        tel: { ...memberInfo.tel, [e.target.name]: e.target.value },
      });
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      setMemberInfo({
        ...memberInfo,
        tel: { ...memberInfo.tel, [e.target.name]: e.target.value },
      });
    }
  };
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setMemberInfo({ ...memberInfo, email: newEmail });
    const validationEmail = validateEmail(newEmail, dbList.emailList);
    setVerifuMsg({ ...verifuMsg, emailMsg: validationEmail.msg });
    setIsAllValidate({ ...isAllValidate, email: validationEmail.validation });
  };
  const handleGender = (e) => {
    setMemberInfo({ ...memberInfo, gender: e.target.value });
  };
  const handleBirth = (e) => {
    if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      const name = e.target.name;
      const value = e.target.value;
      //   setMemberInfo((prevMemberInfo) => ({ ...prevBirth, [name]: value }));
      setMemberInfo((prevMemberInfo) => ({
        ...prevMemberInfo,
        birth: { [name]: value },
      }));
      //   const validationBirth = validateBirth({ ...birth, [name]: value });
      const validationBirth = validateBirth({
        ...memberInfo,
        birth: { ...memberInfo.birth, [name]: value },
      });
      setVerifuMsg({ ...verifuMsg, birthMsg: validationBirth.msg });
      setIsAllValidate({ ...isAllValidate, birth: validationBirth.validation });
    }
  };

  // 개별 동의항목이 변경될때마다 전체 동의 항목의 상태를 바꿔야함
  useEffect(() => {
    getDbList();
  }, [getDbList]);
  ///////////////////////////////////////////////////////////////////////////////////////

  //폼 전송 전 최종 유효성 검사///////////////////////////////////////////////////////////////////////
  const [isAllValidate, setIsAllValidate] = useState({
    id: false,
    password: false,
    newPassword: false,
    name: false,
    address: false,
    phone: false,
    email: false,
    birth: true,
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //폼전송////////////////////////////////////////////////////////////////////////////////////////////

  // 폼데이터 객체 만들고 input값 폼데이터에 추가
  const fd = new FormData();
  fd.append("id", memberInfo.id.toLowerCase());
  fd.append("password", memberInfo.newPassword);
  fd.append("name", memberInfo.name);
  fd.append(
    "address",
    memberInfo.addr.addr1 +
      "^" +
      memberInfo.addr.addr2 +
      "^" +
      memberInfo.addr.addr3
  );
  fd.append(
    "phone",
    memberInfo.phone.phone1 +
      "-" +
      memberInfo.phone.phone2 +
      "-" +
      memberInfo.phone.phone3
  );
  if (memberInfo.tel.tel2 && memberInfo.tel.tel3) {
    fd.append(
      "tel",
      memberInfo.tel.tel1 +
        "-" +
        memberInfo.tel.tel2 +
        "-" +
        memberInfo.tel.tel3
    );
  }
  fd.append("email", memberInfo.email.toLowerCase());
  fd.append("gender", memberInfo.gender);
  if (memberInfo.birth.birthYear.length === 4) {
    fd.append(
      "birth",
      memberInfo.birth.birthYear +
        "-" +
        memberInfo.birth.birthMonth.padStart(2, "0") +
        "-" +
        memberInfo.birth.birthDay.padStart(2, 0)
    );
  }
  fd.append("mileage", 0);

  // axios를 통한 폼데이터 백엔드에 전송
  const reg = () => {
    const validAll = validateAll(isAllValidate);
    if (validAll.validation) {
      axios.post("http://localhost:8090/member/reg", fd).then((res) => {
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
      <h2 className="joinTitle">회원정보 수정</h2>
      <h3>기본정보</h3>
      <p className="required">
        <RedAs /> 필수입력사항
      </p>
      <table className={"basicInfo joinTbl"} onKeyDown={handleKeyEvent}>
        <tr>
          <th className="col1">
            아이디
            <RedAs />
          </th>
          <td>
            <input
              name="id"
              maxLength={16}
              value={memberInfo.id}
              onChange={handleId}
              readOnly
            />
            <span className="idDetail"> (영문소문자/숫자,4~16자)</span>{" "}
          </td>
        </tr>
        <tr>
          <th className="col1">
            기존 비밀번호
            <RedAs />
          </th>
          <td>
            <input
              name="oldPassword"
              type="password"
              maxLength={16}
              value={memberInfo.oldPassword}
              onChange={handleOldPassword}
            />
            <span className="pwDetail">
              {" "}
              (영문 대소문자 조합 + 숫자/특수문자 중 2가지 이상 조합, 10자~16자)
            </span>
          </td>
        </tr>
        <tr>
          <th className="col1">
            신규 비밀번호
            <RedAs />
          </th>
          <td>
            <input
              name="newPassword"
              type="password"
              maxLength={16}
              value={memberInfo.newPassword}
              onChange={handleNewPassword}
            />
            <span className="pwDetail">
              {" "}
              (영문 대소문자 조합 + 숫자/특수문자 중 2가지 이상 조합, 10자~16자)
            </span>
          </td>
        </tr>
        <tr>
          <th className="col1">
            신규 비밀번호 확인
            <RedAs />
          </th>
          <td>
            <input
              name="newPasswodConfirm"
              type="password"
              maxLength={16}
              value={memberInfo.newPasswordConfim}
              onChange={handleNewPasswordConfirm}
            />
            <span
              className={`verifyMsg ${
                isAllValidate.newPassword ? "verifyMsg_valid" : ""
              }`}
            >
              {" "}
              {verifuMsg.pwMsg}
            </span>
          </td>
        </tr>
        <tr>
          <th className="col1">
            이름
            <RedAs />
          </th>
          <td>
            <input name="name" value={memberInfo.name} onChange={handleName} />
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
              value={memberInfo.addr.addr1}
              onChange={handleAddr}
              readOnly
            />
            <button onClick={handleAddrPopup}>주소 검색</button>
            {addrPopup && (
              <DaumPostcodeAPI
                addr={memberInfo.addr}
                setAddr={(newAddr) =>
                  setMemberInfo({ ...memberInfo, addr: newAddr })
                }
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
              value={memberInfo.addr.addr2}
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
              value={memberInfo.addr.addr3}
              onChange={handleAddr}
            />
            {/* <button
              onClick={() => {
                alert(JSON.stringify(addr));
              }}
            >
              조회
            </button> */}
          </td>
        </tr>
        <tr>
          <th className="col1">
            휴대전화
            <RedAs />
          </th>
          <td>
            {/* <input name="phone1" value={phone.phone1} onChange={handlePhone} /> */}
            <select
              name="phone1"
              value={memberInfo.phone.phone1}
              onChange={handlePhone}
            >
              {telPhoneArr.phone.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>{" "}
            -{" "}
            <input
              name="phone2"
              maxLength={4}
              value={memberInfo.phone.phone2}
              onChange={handlePhone}
            />{" "}
            -{" "}
            <input
              name="phone3"
              maxLength={4}
              value={memberInfo.phone.phone3}
              onChange={handlePhone}
            />
            {/* <div>
              {phone.phone1}-{phone.phone2}-{phone.phone3}
            </div> */}
          </td>
        </tr>
        <tr>
          <th className="col1">일반전화</th>
          <td>
            {/* <input name="tel1" value={tel.tel1} onChange={handleTel} /> */}
            <select
              name="tel1"
              value={memberInfo.tel.tel1}
              onChange={handleTel}
            >
              {telPhoneArr.tel.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            -{" "}
            <input
              name="tel2"
              maxLength={4}
              value={memberInfo.tel.tel2}
              onChange={handleTel}
            />{" "}
            -{" "}
            <input
              name="tel3"
              maxLength={4}
              value={memberInfo.tel.tel3}
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
            <input
              name="email"
              value={memberInfo.email}
              onChange={handleEmail}
            />
            <span
              className={`verifyMsg ${
                isAllValidate.email ? "verifyMsg_valid" : ""
              }`}
            >
              {" "}
              {verifuMsg.emailMsg}
            </span>
            {/* <button
              onClick={() => {
                alert(JSON.stringify(dbList));
              }}
            >
              조회
            </button> */}
          </td>
        </tr>
      </table>
      <h3>추가정보</h3>
      <table className={"addInfo joinTbl"} onKeyDown={handleKeyEvent}>
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
              className="birthYear"
              value={memberInfo.birth.birthYear}
              onChange={handleBirth}
            />{" "}
            년{" "}
            <input
              name="birthMonth"
              value={memberInfo.birth.birthMonth}
              className="birthMonth"
              onChange={handleBirth}
            />{" "}
            월{" "}
            <input
              name="birthDay"
              value={memberInfo.birth.birthDay}
              className="birthDay"
              onChange={handleBirth}
            />{" "}
            일{" "}
            <span
              className={`verifyMsg ${
                isAllValidate.birth ? "verifyMsg_valid" : ""
              }`}
            >
              {verifuMsg.birthMsg}
            </span>
          </td>
        </tr>
      </table>
      <div id="modifyButton">
        <button onClick={reg}>회원가입</button>
      </div>
    </>
  );
};

export default MyInfo;
