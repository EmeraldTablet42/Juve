import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import redAsteriks from "../../../img/join/redAsteriks3.png";
import { setAuth } from "../member/authSlice";
import DaumPostcodeAPI from "../member/daumPostcodeAPI";
const MyShipmentAdd = () => {
  const myDispatch = useDispatch();
  const navi = useNavigate();
  // 테이블 전체에 대한 키보드 이벤트 핸들러(숫자/한글 입력 구분용)//////////////////////
  const [keyEvent, setKeyEvent] = useState("");
  const handleKeyEvent = (e) => {
    const key = e.key;
    setKeyEvent(key);
    console.log(key);
  };
  ////////////////////////////////////////////////////////////////////////////////////////
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
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
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
  const [isDefault, setIsDefault] = useState("N");

  // 주소창 팝업 state - 기존값 false//
  const [addrPopup, setAddrPopup] = useState(false);

  const handleAddrPopup = (data) => {
    setAddrPopup(!addrPopup);
  };

  const handleDestination = (e) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
    setIsAllValidate({
      ...isAllValidate,
      destination: Boolean(newDestination),
    });
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
      setTel({ ...tel, [e.target.name]: e.target.value });
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      setTel({ ...tel, [e.target.name]: e.target.value });
    }
  };

  const handleIsDefault = (e) => {
    e.target.checked ? setIsDefault("Y") : setIsDefault("N");
  };

  //폼 전송 전 최종 유효성 검사///////////////////////////////////////////////////////////////////////
  const [isAllValidate, setIsAllValidate] = useState({
    destination: false,
    name: false,
    address: false,
    phone: false,
  });

  const validateMsg = () => {
    if (!isAllValidate.destination) {
      alert("배송지를 입력하세요.");
      return false;
    }
    if (!isAllValidate.name) {
      alert("이름을 입력하세요.");
      return false;
    }
    if (!isAllValidate.address) {
      alert("주소를 입력하세요");
      return false;
    }
    if (!isAllValidate.phone) {
      alert("휴대전화 번호를 입력하세요.");
      return false;
    }
    return true;
  };

  /// 폼 설정//////////////////////////////////////////////////////////////////////////////////////////
  const fd = new FormData();
  // fd.append("id", id);
  fd.append("destination", destination);
  fd.append("name", name);
  fd.append("address", addr.addr1 + "^" + addr.addr2 + "^" + addr.addr3);
  fd.append("phone", phone.phone1 + "-" + phone.phone2 + "-" + phone.phone3);
  if (tel.tel2 && tel.tel3) {
    fd.append("tel", tel.tel1 + "-" + tel.tel2 + "-" + tel.tel3);
  }
  fd.append("regDate", new Date());
  fd.append("isDefault", isDefault);

  // 폼 전송 전 id 토큰 검사///////////////////////////////////////////////////////////////////////////
  const getId = async () => {
    if (sessionStorage.getItem("loginToken")) {
      try {
        const res = await axios.get(
          `http://localhost:8090/member.get.loginedMember?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        );
        if (res.data === "") {
          alert("로그인시간이 만료되었습니다. 로그인 후 다시 시도하여 주세요");
          myDispatch(setAuth({ isLogined: false, memberId: "" }));
          navi("/");
        } else {
          // alert(res.data.id);
          fd.set("orderId", res.data.id);
        }
      } catch (error) {
        alert("DB통신 에러. 잠시 후 다시 시도하여 주세요");
        navi("/");
      }
    } else {
      alert("로그인시간이 만료되었습니다. 로그인 후 다시 시도하여 주세요");
      myDispatch(setAuth({ isLogined: false, memberId: "" }));
      navi("/");
    }
  };
  // 폼 전송/////////////////////////////////////////
  const regShipment = async () => {
    if (validateMsg()) {
      try {
        await getId();
        axios
          .post("http://localhost:8090/member/mypage/reg.shipment", fd)
          .then((res) => {
            if (res.data === "") {
              alert("배송지는 최대 5개까지만 등록가능합니다.");
              window.location.replace("/member/mypage/myshipment");
            } else {
              // alert("등록성공!");
              window.location.replace("/member/mypage/myshipment");
            }
          });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <div className="titleArea">
        <h2>배송지 등록</h2>
        <p>자주 사용하는 배송지를 등록할 수 있습니다.</p>
      </div>
      <div className="shipmentAddTblDiv">
        <table className="shipmentAddTbl" border={1} onKeyDown={handleKeyEvent}>
          <tr>
            <th>
              배송지명
              <RedAs />
            </th>
            <td>
              <input
                name="destination"
                value={destination}
                onChange={handleDestination}
                maxLength={30}
                placeholder="최대 30자"
              />
            </td>
          </tr>
          <tr>
            <th className="col1">
              이름
              <RedAs />
            </th>
            <td>
              <input
                name="name"
                value={name}
                onChange={handleName}
                maxLength={4}
              />
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
              {/* <div>
              {phone.phone1}-{phone.phone2}-{phone.phone3}
            </div> */}
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
        </table>
      </div>
      <button onClick={regShipment}>등록</button>
      <button
        onClick={() => {
          navi(-1);
        }}
      >
        취소
      </button>
      <input name="isDefault" type="checkbox" onChange={handleIsDefault} />
      기본 배송지로 지정
    </>
  );
};

export default MyShipmentAdd;
