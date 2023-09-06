import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/myorder.css";
const MyOrder = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  const endDate = new Date();
  endDate.setMonth(endDate.getHours() + 9);

  const [params, setParams] = useState({
    token: sessionStorage.getItem("loginToken"),
    startDate: startDate,
    endDate: endDate,
    page: 1,
    orderStatus: 0,
  });

  const [selectedOrder, setSelectedOrder] = useState([]);

  const getOrderListFromDB = () => {
    axios
      .get("http://localhost:8090/order/get.order.loginToken", {
        params: {
          ...params,
          startDate: params.startDate.toISOString(),
          endDate: params.endDate.toISOString(),
        },
      })
      .then((res) => {
        setSelectedOrder(res.data.orders);
        console.log(JSON.stringify(res.data.orders));
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    getOrderListFromDB();
  }, [params]);

  const orderTr = selectedOrder.map((d, i) => {
    const datePart =
      d.orderDate.split(" ")[0] +
      d.orderDate.split(" ")[1] +
      d.orderDate.split(" ")[2];
    return (
      <tr key={i}>
        <td>{d.orderCode}</td>
        <td>{datePart}</td>
        <td>{d.carts[0].productCode}</td>
        <td>{d.finalPrice}</td>
        <td>{d.orderStatus}</td>
      </tr>
    );
  });

  return (
    dataLoaded && (
      <>
        <div className="myorder-wrapper">
          <div className="myorder-text">
            <div className="test1">
              <h2>주문/예약 내역</h2>
            </div>
            <div className="test2">
              <h3>주문처리 현황</h3>
            </div>
          </div>
          <div className="order">
            <div>
              <strong>예약대기</strong>
              &nbsp;
              <a href="orderList">
                <span>0</span>
              </a>
            </div>
            <div>
              <strong>예약확인</strong>
              &nbsp;
              <a href="orderList">0</a>
            </div>
            <div>
              <strong>배송준비중</strong>
              &nbsp;
              <a href="orderList">0</a>
            </div>
            <div>
              <strong>배송중</strong>
              &nbsp;
              <a href="orderList">0</a>
            </div>
            <div>
              <strong>배송완료</strong>
              &nbsp;
              <a href="orderList">0</a>
            </div>
          </div>
          <div className="get-list">
            <h3>주문 목록</h3>
          </div>
          <div className="order-control">
            <div className="selectController">
              <div className="control-tag">
                <span>조회기간</span>
              </div>
              <div className="control-tag">
                <a href="/order/list">오늘</a>
              </div>
              <div className="control-tag">
                <a href="/order/list">일주일</a>
              </div >
              <div className="control-tag">
                <a href="/order/list">1개월</a>
              </div>
              <div className="control-tag">
                <a href="/order/list">3개월</a>
              </div>
              <div className="control-tag">
                <a href="/order/list">6개월</a>
              </div>
              <div className="control-input">
                <input />
                ~
                <input />
              </div>
            </div>
            <div className="selectedList">
              <table className="orderListTbl">
                <tr className="top-tr">
                  <th>주문번호</th>
                  <th>주문날짜</th>
                  <th>주문상품</th>
                  <th>금액</th>
                  <th>상태</th>
                </tr>
                {orderTr}
              </table>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MyOrder;
