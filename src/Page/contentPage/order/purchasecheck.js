import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../categorypage/styles/purchase.css";
const PurchaseCheck = () => {
  //order 객체 from Redux
  const order = useSelector((state) => state.order).order;
  const navi = useNavigate();
  const senderAddress =
    order && order.senderAddress ? order.senderAddress.split("^") : [];
  const recipientAddress =
    order && order.recipientAddress ? order.recipientAddress.split("^") : [];
  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  // 모든 데이터
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    if (!order) {
      alert("잘못된 접근입니다.");
      navi("/");
    }

    axios.get("http://localhost:8090/product.get").then((res) => {
      setAllData(res.data.products);
    });
  }, [order, navi]);

  const auth = useSelector((state) => state.authindex);

  /// 주문상태 변경용 state
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const handleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleApply = () => {
    axios
      .get(
        `http://localhost:8090/order/set.orderstatus?orderCode=${order.orderCode}&orderStatus=${orderStatus}`
      )
      .then(() => {
        navi("/admin/order");
      })
      .catch(() => {
        alert("DB통신에러. 잠시 후 다시 시도해주세요");
      });
  };

  return (
    order && (
      <div>
        <div>
          <div className="completememo">
            <p>주문이 완료되었습니다</p>
            <p>고객님의 주문번호는</p>
            <p>{order.orderCode}입니다.</p>
          </div>
        </div>
        <div className="purchase-wrapper">
          <div className="purchase-margin-check">
            <div className="purchase-addr">
              <div className="purchase-addr-h2">
                <h2>주 문 정 보</h2>
              </div>
              <div className="purchase-table">
                <table id="basicInfo" className="joinTbl">
                  <tr>
                    <th className="col1">이름</th>
                    <td>{order.sender}</td>
                  </tr>
                  <tr>
                    <th className="col1" rowSpan={3} valign="top">
                      주소
                    </th>
                    <td>{senderAddress[0]}</td>
                  </tr>
                  <tr>
                    <td>{senderAddress[1]}</td>
                  </tr>
                  <tr>
                    <td>{senderAddress[2]}</td>
                  </tr>
                  <tr>
                    <th className="col1">휴대전화</th>
                    <td>{order.senderPhone}</td>
                  </tr>
                  <tr>
                    <th className="col1">일반전화</th>
                    <td>{order.senderTel}</td>
                  </tr>
                  <tr>
                    <th className="col1">이메일</th>
                    <td>{order.senderEmail}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="purchase-margin-check">
            <div className="purchase-get">
              <div className="purchase-get-h2">
                <h2>배송지</h2>
              </div>
              <div className="purchase-table">
                <table id="resentShipment" className="joinTbl">
                  <tr>
                    <th className="col1">배송지명</th>
                    <td>{order.destination}</td>
                  </tr>
                  <tr>
                    <th className="col1">수령인</th>
                    <td>{order.recipient}</td>
                  </tr>
                  <tr>
                    <th className="col1" rowSpan={3} valign="top">
                      주소
                    </th>
                    <td>{recipientAddress[0]}</td>
                  </tr>
                  <tr>
                    <td>{recipientAddress[1]}</td>
                  </tr>
                  <tr>
                    <td>{recipientAddress[2]}</td>
                  </tr>
                  <tr>
                    <th className="col1">휴대전화</th>
                    <td>{order.recipientPhone}</td>
                  </tr>
                  <tr>
                    <th className="col1">일반전화</th>
                    <td>{order.recipientTel}</td>
                  </tr>
                </table>
              </div>
              <div className="purchase-mesege">{order.message}</div>
            </div>
          </div>
          <div className="purchase-margin-bottom">
            <div className="purchase-product">
              <p>주문 상품 </p>
              {order.carts.map((v, i) => {
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
          <div className="purchase-margin-bottom">
            <div className="purchase-calculate">
              {auth.isLogined && <h2>예상 적립 마일리지:{order.mileage}</h2>}
              <table className="purchase-price">
                <tr className="tr1">
                  <td>총 상품 가격</td>
                  <td>배송비</td>
                  <td>최종금액</td>
                </tr>
                <tr className="tr2">
                  <td>{order.totalCartPrice}</td>
                  <td>+ {order.shipfee}</td>
                  <td>= {order.finalPrice}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="purchase-margin-button"></div>
        </div>
        {auth.memberId === "adminjuve" ? (
          <div className="purchase-main">
            <select
              className="purchase-status"
              value={orderStatus}
              onChange={handleOrderStatus}
            >
              <option value={1}>예약대기</option>
              <option value={2}>예약확인</option>
              <option value={3}>배송준비중</option>
              <option value={4}>배송중</option>
              <option value={5}>배송완료</option>
            </select>
            <button onClick={handleApply} id="statusChange">
              변경
            </button>
          </div>
        ) : (
          <div className="purchase-main">
            <button className="purchase-main-button">
              <Link to="/">메인 화면으로</Link>
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default PurchaseCheck;
