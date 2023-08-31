import React, { useState } from "react";
import DaumPostcodeAPI from "../member/daumPostcodeAPI";
import { validateEmail } from "../member/validation";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "./components/addmenuslice";
import { Link } from "react-router-dom";

const Purchase = () => {
  // 회원정보 더미데이터(DB통신시 이부분을 setMemberInfo로 바꿔주면됨)
  const [memberInfo, setMemberInfo] = useState({
    name: "김쥬브",
    email: "aaa@bb.com",
    addr: "28802^충북 청주시 서원구 궁뜰로33번길 135(분평동)^123123",
    phone: "010-1234-1234",
    tel: { tel1: "02", tel2: "", tel3: "" },
  });

  //Redux 부분
  const dispatch = useDispatch();
  const addedMenus = useSelector((state) => state.menu);

  const [keyEvent, setKeyEvent] = useState("");
  const handleKeyEvent = (e) => {
    const key = e.key;
    setKeyEvent(key);
    console.log(key);
  };

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

  return (
    <div>
      <div>
        <p>주문정보</p>
        <table id="basicInfo" className="joinTbl" onKeyDown={handleKeyEvent}>
          <tr>
            <th className="col1">이름</th>
            <td>{memberInfo.name}</td>
          </tr>
          <tr>
            <th className="col1" rowSpan={3} valign="top">
              주소
            </th>
            <td>{memberInfo.addr.split("^")[0]}</td>
          </tr>
          <tr>
            <td>{memberInfo.addr.split("^")[1]}</td>
          </tr>
          <tr>
            <td>{memberInfo.addr.split("^")[2]}</td>
          </tr>
          <tr>
            <th className="col1">휴대전화</th>
            <td>{memberInfo.phone}</td>
          </tr>
          <tr>
            <th className="col1">일반전화</th>
            <td>
              <select
                name="tel1"
                value={memberInfo.tel.tel1}
                onChange={handleTel}
              >
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
            <th className="col1">이메일</th>
            <td>{memberInfo.email}</td>
          </tr>
        </table>
      </div>
      <div>
        <p>배송지</p>
        <table id="basicInfo" className="joinTbl" onKeyDown={handleKeyEvent}>
          <tr>
            <th className="col1">이름</th>
            <td>
              {/* <input name="name" value={name} onChange={handleName} /> */}
            </td>
          </tr>
          <tr>
            <th className="col1" rowSpan={3} valign="top">
              주소
            </th>
            <td>
              {/* <input
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
                />
              )} */}
            </td>
          </tr>
          <tr>
            <td>
              {/* <input
                name="addr2"
                placeholder="기본주소"
                value={addr.addr2}
                onChange={handleAddr}
                readOnly
              /> */}
            </td>
          </tr>
          <tr>
            <td>
              {/* <input
                name="addr3"
                placeholder="상세주소"
                value={addr.addr3}
                onChange={handleAddr}
              /> */}
            </td>
          </tr>
          <tr>
            <th className="col1">휴대전화</th>
            <td>
              {/* <select name="phone1" value={phone.phone1} onChange={handlePhone}>
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
              /> */}
            </td>
          </tr>
          <tr>
            <th className="col1">일반전화</th>
            <td>
              {/* <select name="tel1" value={tel.tel1} onChange={handleTel}>
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
              /> */}
            </td>
          </tr>
          <tr>
            <th className="col1">이메일</th>
            <td>
              {/* <input name="email" value={email} onChange={handleEmail} />
              <span> {verifyEmailMsg}</span> */}
            </td>
          </tr>
        </table>
      </div>
      <div>
        <select>
          <option value="" hidden>
            추가메세지
          </option>
          <option>배송전 연락주세요</option>
          <option>직접방문할게요</option>
          <option>계좌이체하겠습니다</option>
        </select>
      </div>
      <div>
        <div>
          <p>주문 상품</p>
          <button onClick={() => { alert(JSON.stringify(addedMenus)) }}></button>
          {addedMenus.map((menu, index) => (
            <div key={index}>
              {menu.salproductName && <p>상 품 명: {menu.salproductName}</p>}
              {menu.wihproductName && <p>상 품 명: {menu.wihproductName}</p>}
              {menu.cupproductName && <p>상 품 명: {menu.cupproductName}</p>}
              {menu.bevproductName && <p>상 품 명: {menu.bevproductName}</p>}
              {menu.sdrValue && <p>드 레 싱: {menu.sdrValue}</p>}
              {menu.smtValue && <p>메인토핑: {menu.smtValue}</p>}
              {menu.sstValue && <p>서브토핑: {menu.sstValue}</p>}
              {menu.ssmValue && <p>서브메뉴: {menu.ssmValue}</p>}
              {menu.wmtValue && <p>메인토핑: {menu.wmtValue}</p>}
              {menu.wstValue && <p>서브토핑: {menu.wstValue}</p>}
              <p>수 량: {menu.counting}</p>
            </div>
          ))}
        </div>
      </div>
      <div>마일리지</div>
      <div>
        <h3>결제정보</h3>
        <p>주문상품(총가격)</p>
        <p>배송비 : 4000원</p>
      </div>
      <button>
        <Link to="/purchasecheck">예약하기</Link>
      </button>
    </div>
  );
};

export default Purchase;
