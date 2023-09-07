import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrder } from "../order/purchaseSlice";
import "../myPage/css/myorder.css";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [statusByCode, setStatusByCode] = useState({});

  const handleStatus = (e, orderCode) => {
    const newStatusByCode = { ...statusByCode };
    newStatusByCode[orderCode] = e.target.value;
    setStatusByCode(newStatusByCode);
  };

  const handleApply = (orderCode) => {
    const newStatus = statusByCode[orderCode];
    if (newStatus !== undefined) {
      alert(orderCode);
      alert(newStatus);
      console.log(
        `주문 번호 ${orderCode}의 상태를 ${newStatus}로 업데이트합니다.`
      );
    }
  };

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 9);

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
      .get("http://localhost:8090/order/get.order.admin", {
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

  const getOrder = (orderCode) => {
    const fd = new FormData();
    fd.set("orderCode", orderCode);
    fd.set("token", sessionStorage.getItem("loginToken"));
    // alert(orderCode);
    // alert(sessionStorage.getItem("loginToken"));
    axios
      .post("http://localhost:8090/order/get.order.admin.detail", fd)
      .then((res) => {
        // alert(JSON.stringify(res.data));
        dispatch(setOrder(res.data));
        navi("/purchasecheck");
      })
      .catch(() => {
        alert("DB통신에러. 잠시 후 다시 시도해주세요.");
      });
  };

  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  useEffect(() => {
    getOrderListFromDB();
  }, [params]);

  const orderTr = selectedOrder.map((d, i) => {
    const datePart =
      d.orderDate.split(" ")[0] +
      d.orderDate.split(" ")[1] +
      d.orderDate.split(" ")[2];
    const addrPart =
      d.recipientAddress.split("^")[1] +
      d.recipientAddress.split("^")[2] +
      "[" +
      d.recipientAddress.split("^")[0] +
      "]";

    return (
      <tr
        key={i}
        onClick={(e) => {
          // status 클래스를 가진 td에서의 클릭 이벤트를 막음
          if (e.target.className === "status" || "orderStatus") {
            return null;
          } else {
            getOrder(d.orderCode);
          }
        }}
      >
        <td>{d.orderCode}</td>
        <td>{datePart}</td>
        <td>{addrPart}</td>
        <td>{cTn[d.carts[0].productCode]}</td>
        <td>{d.finalPrice}</td>
        <td className="status">
          <select
            onChange={(e) => {
              handleStatus(e, d.orderCode);
            }}
            className="orderStatus"
            value={statusByCode[d.orderCode] || d.orderStatus}
          >
            <option value={1}>예약대기</option>
            <option value={2}>예약확인</option>
            <option value={3}>배송준비</option>
            <option value={4}>배송중</option>
            <option value={5}>배송완료</option>
          </select>
        </td>
        <td>
          <button
            onClick={() => {
              handleApply(d.orderCode);
            }}
          >
            적용
          </button>
        </td>
      </tr>
    );
  });

  const handleDate = (e) => {
    if (e.target.name === "startDate") {
      setParams({ ...params, startDate: new Date(e.target.value) });
    }
    if (e.target.name === "endDate") {
      setParams({ ...params, endDate: new Date(e.target.value) });
    }
  };

  const setTerm = (e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 1); // 시간을 00:00:00으로 설정
    let settedDate = new Date(today);
    if (e.target.id === "today") {
      settedDate = today;
    }
    if (e.target.id === "week") {
      settedDate.setDate(today.getDate() - 7);
    }
    if (e.target.id === "month") {
      settedDate.setMonth(today.getMonth() - e.target.getAttribute("value"));
    }
    setParams({ ...params, startDate: settedDate, endDate: new Date() });
  };

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
              <div id="today" onClick={setTerm} className="control-tag">
                오늘
              </div>
              <div
                id="week"
                value={1}
                onClick={setTerm}
                className="control-tag"
              >
                1주일
              </div>
              <div
                id="month"
                value={1}
                onClick={setTerm}
                className="control-tag"
              >
                1개월
              </div>
              <div
                id="month"
                value={3}
                onClick={setTerm}
                className="control-tag"
              >
                3개월
              </div>
              <div
                id="month"
                value={6}
                onClick={setTerm}
                className="control-tag"
              >
                6개월
              </div>
              <div className="control-input">
                <input
                  value={params.startDate.toISOString().split("T")[0]}
                  name="startDate"
                  onChange={handleDate}
                  type="date"
                />
                ~
                <input
                  value={params.endDate.toISOString().split("T")[0]}
                  name="endDate"
                  onChange={handleDate}
                  type="date"
                />
              </div>
            </div>
            <div className="selectedList">
              <table border={1} className="orderListTbl2">
                <tr className="top-tr">
                  <th>주문번호</th>
                  <th>날짜</th>
                  <th>주소</th>
                  <th>상품명</th>
                  <th>금액</th>
                  <th>상태</th>
                  <th>변경</th>
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

export default AdminOrder;
