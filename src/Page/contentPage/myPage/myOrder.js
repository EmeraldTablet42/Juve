import axios from "axios";
import React, { useEffect, useState } from "react";

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
        alert(JSON.stringify(res.data.orders));
        setSelectedOrder(res.data.orders);
        console.log(JSON.stringify(res.data.orders));
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    getOrderListFromDB();
  }, [params]);

  const orderTr = selectedOrder.map((d, i) => {
    const datePart = d.orderDate.split(" ")[0]+d.orderDate.split(" ")[1]+d.orderDate.split(" ")[2];
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
        <h2>주문/예약 내역</h2>
        <h3>주문처리 현황</h3>
        <div className="orderState">
          <ul className="order" style={{ listStyle: "none" }}>
            <li>
              <strong>예약대기</strong>
              <a href="orderList">
                <span>0</span>
              </a>
            </li>
            <li>
              <strong>예약확인</strong>
              <a href="orderList">0</a>
            </li>
            <li>
              <strong>배송준비중</strong>
              <a href="orderList">0</a>
            </li>
            <li>
              <strong>배송중</strong>
              <a href="orderList">0</a>
            </li>
            <li>
              <strong>배송완료</strong>
              <a href="orderList">0</a>
            </li>
          </ul>
        </div>
        <h3>주문 목록</h3>
        <hr />
        <div className="selectController">
          <div className="controlSet">
            <span>조회기간</span>
            <a href="/order/list">오늘</a>
            <a href="/order/list">일주일</a>
            <a href="/order/list">1개월</a>
            <a href="/order/list">3개월</a>
            <a href="/order/list">6개월</a>
            <input />
            ~
            <input />
          </div>
        </div>
        <div className="selectedList">
          주문내역 조회한 값 들어오는곳
          <table className="orderListTbl">
            <tr>
              <th>주문번호</th>
              <th>주문날짜</th>
              <th>주문상품</th>
              <th>금액</th>
              <th>상태</th>
            </tr>
            {orderTr}
          </table>
        </div>
      </>
    )
  );
};

export default MyOrder;
