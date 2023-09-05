import React, { useState, useEffect } from "react";
import DaumPostcodeAPI from "../member/daumPostcodeAPI";
import { validateEmail } from "../member/validation";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/purchase.css";
import axios from "axios";
import "./styles/purchase.css";
const Purchase = () => {
  // 회원정보 더미데이터(DB통신시 이부분을 setMemberInfo로 바꿔주면됨)
  const [memberInfo, setMemberInfo] = useState({
    name: "김쥬브2",
    email: "aaa@bb.com",
    addr: "28802^충북 청주시 서원구 궁뜰로33번길 135(분평동)^123123",
    phone: "010-1234-1234",
    tel: { tel1: "02", tel2: "", tel3: "" },
  });

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
  // cartData
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
    <div>
      <div>
        <div style={{ textAlign: "center", margin: "40px", top: "10px" }}>
          <p>주문이 완료되었습니다</p>
          <p>고객님의 주문번호는</p>
          <p>[날짜a0001] 입니다.</p>
        </div>
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
        <div>
          <p>주문 상품</p>
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
          <div
            className="purchase-detail"
            style={{ textAlign: "right", fontSize: "24pt", marginRight:"20px"}}
          >
            <p>{point}포인트가 적립되었습니다.</p>
            <p>잔여포인트:</p>
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
      </div>
      <div className="purchase-main">
      <button className="purchase-main-button">
        <Link to="/">메인 화면으로</Link>
      </button>
    </div>
    </div>
  );
};

export default Purchase;
