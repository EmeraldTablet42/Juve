import React, { useState, useEffect } from "react";
import DaumPostcodeAPI from "../member/daumPostcodeAPI";
import { validateEmail } from "../member/validation";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "./components/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/purchase.css";
import { useNavigate } from "react-router";
const Purchase = () => {
  // 회원정보 더미데이터(DB통신시 이부분을 setMemberInfo로 바꿔주면됨)
  const [memberInfo, setMemberInfo] = useState({
    name: "김쥬브",
    email: "aaa@bb.com",
    addr: "28802^충북 청주시 서원구 궁뜰로33번길 135(분평동)^123123",
    phone: "010-1234-1234",
    tel: { tel1: "02", tel2: "", tel3: "" },
  });
  const navi = useNavigate();
  //Redux 부분
  const dispatch = useDispatch();
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
  // 모든 데이터
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      setAllData(res.data.products);
    });
  }, []);
  // cartdata
  const cart = useSelector((state) => state.cart);

  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  const totalCartPrice = cart.cart.reduce(
    (total, item) => total + item.price,
    0
  );
  const finalPrice = totalCartPrice + 4000;
  const point = totalCartPrice * 0.1;
  return (
    <div className="purchase-wrapper">
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
          <p>주문 상품 (옵션에따라 상품가격은 달라질수있습니다)</p>
          {cart.cart.map((v, i) => {
            const productData = allData.find(
              (data) => data.productCode === v.productCode
            );
            const imageUrl = productData
              ? `http://localhost:8090/product/photo/${productData.productPhoto}`
              : "";
            //일단 menu-item 클래로 css 임시로 설정해둠
            // src\Page\contentPage\categorypage\styles\popupcart.css <- 여기에 가면 해당 css 설정 있음
            return (
              <div className="menu-item" key={i}>
                <div className="product-image">
                  <img
                    src={imageUrl}
                    alt="상품이미지"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div
                  className="product-detail"
                  style={{ alignItems: "center" }}
                >
                  <div className="product-item">
                    {cTn[v.productCode]}
                    {/* 이부분 누르면 배열에서 삭제됨 */}
                    <br />
                    {/* cTn(codeToName) 넣은 이유 = 코드명 -> 제품이름으로 변환 */}
                    {v.sdrValue && `드레싱 :${cTn[v.sdrValue]}`}
                    <br />
                    {/* && 앞에 해당제품 있을때만 map 돌림 안쓰면 오류터짐 */}
                    {v.smtValue &&
                      `메인토핑 :${v.smtValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    {v.wmtValue &&
                      `메인토핑 :${v.wmtValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    <br />
                    {v.sstValue &&
                      `서브토핑 :${v.sstValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    {v.wstValue &&
                      `서브토핑 :${v.wstValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    <br />
                    {v.ssmValue &&
                      `보조메뉴 :${v.ssmValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                  </div>
                </div>
                <div className="product-price">
                  {`수량 :${v.count}`}
                  <br />
                  {`가격 :${v.price}`}
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3>결제정보</h3>
        {cart.cart.map((v, i) => {
          const productData = allData.find(
            (data) => data.productCode === v.productCode
          );
          const imageUrl = productData
            ? `http://localhost:8090/product/photo/${productData.productPhoto}`
            : "";
          return (
            <div className="menu-item" key={i} style={{ alignItems: "center" }}>
              {" "}
              <div className="product-image">
                <img
                  src={imageUrl}
                  alt="상품이미지"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="product-item" style={{ textAlign: "center" }}>
                {cTn[v.productCode]}
              </div>
              <div className="product-price">
                {`수량 :${v.count}`}
                <br />
                {`가격 :${v.price}`}
                <br />
              </div>
            </div>
          );
        })}
        <div
          className="purchase-detail"
          style={{ textAlign: "right", fontSize: "24pt", marginRight: "20px" }}
        >
          <p>적립마일리지:{point}</p>
          <table className="purchase-price">
            <tr>
              <td>총 상품 가격</td>
              <td>배송비</td>
              <td>최종금액</td>
            </tr>
            <tr className="tr2">
              <td>{totalCartPrice}원</td>
              <td>4000원</td>
              <td>={finalPrice}원</td>
            </tr>
          </table>
          </div>
      </div>
      <button
        className="go-to-check"
        onClick={() => {
          navi("/purchasecheck");
        }}
        style={{ width: "150px", height: "70px" }}
      >
        구매 예약
      </button>
    </div>
  );
};

export default Purchase;
