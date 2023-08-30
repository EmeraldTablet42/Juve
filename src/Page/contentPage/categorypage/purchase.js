import React, { useState } from 'react'
import DaumPostcodeAPI from '../member/daumPostcodeAPI';
import { validateEmail } from '../member/validation'; 
const Purchase = () => {
  const [addData]=useState([]);
  const [dbList, setDdList] = useState({ idList: [], emailList: [] });
  
  const [keyEvent, setKeyEvent] = useState("");
  const handleKeyEvent = (e) => {
    const key = e.key;
    setKeyEvent(key);
    console.log(key);
  };
  const [name, setName] = useState("");
  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);
  };
  // 주소창 팝업 state - 기존값 false//
  const [addrPopup, setAddrPopup] = useState(false);

  const handleAddrPopup = (data) => {
    setAddrPopup(!addrPopup);
  };
  //주소
  const [addr, setAddr] = useState({
    addr1: "",
    addr2: "",
    addr3: "",
  });

  const handleAddr = (e) => {
    const newAddr = { ...addr, [e.target.name]: e.target.value };
    setAddr(newAddr);
  };
  // 핸드폰
  const phoneArr = ["010", "016", "017", "018", "019"];
  const [phone, setPhone] = useState({ phone1: "010", phone2: "", phone3: "" });

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
    }
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
  //e-mail
  const [verifyEmailMsg, setVerifyEmailMsg] = useState("");
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationEmail = validateEmail(newEmail, dbList.emailList);
    setVerifyEmailMsg(validationEmail.msg);
  };
  return (
    <div>
        <div>
          <p>주문정보</p>
          <table id="basicInfo" className="joinTbl" onKeyDown={handleKeyEvent}>
        <tr>
          <th className="col1">
            이름
          </th>
          <td>
            <input name="name" value={name} onChange={handleName} />
          </td>
        </tr>
        <tr>
          <th className="col1" rowSpan={3} valign="top">
            주소
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
          </th>
          <td>
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
          </td>
        </tr>
        <tr>
          <th className="col1">일반전화</th>
          <td>
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
          </th>
          <td>
            <input name="email" value={email} onChange={handleEmail} />
            <span>
              {" "}
              {verifyEmailMsg}
            </span>
          </td>
        </tr>
      </table>
        </div>
        <div>
          <p>배송지</p>
          <table id="basicInfo" className="joinTbl" onKeyDown={handleKeyEvent}>
        <tr>
          <th className="col1">
            이름
          </th>
          <td>
            <input name="name" value={name} onChange={handleName} />
          </td>
        </tr>
        <tr>
          <th className="col1" rowSpan={3} valign="top">
            주소
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
          </th>
          <td>
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
          </td>
        </tr>
        <tr>
          <th className="col1">일반전화</th>
          <td>
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
          </th>
          <td>
            <input name="email" value={email} onChange={handleEmail} />
            <span>
              {" "}
              {verifyEmailMsg}
            </span>
          </td>
        </tr>
      </table>
        </div>
        <div>
          <select>
            <option value="" hidden>
            추가메세지
            </option>
            <option>
              배송전 연락주세요
            </option>
            <option>
              직접방문할게요
            </option>
            <option>
              계좌이체하겠습니다
            </option>
          </select>
        </div>
        <div>
          <p>주문 상품</p>
          <div>
            {addData}
          </div>
        </div>
        <div>마일리지</div>
        <div>
          <p>결제정보</p>
          <p>주문상품</p>
          <p>배송비 : 4000원</p>
        </div>
        <button>주문예약하기</button>
    </div>
  )
}

export default Purchase