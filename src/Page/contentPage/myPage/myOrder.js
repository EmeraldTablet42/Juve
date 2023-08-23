import React from "react";

const MyOrder = () => {

  // 더미데이터
  const dummyOrderList = [
    {orderNum:"A01",orderDate:"2023-08-18",orderProduct:"골라담는 샐러드",orderPrice:4500,orderState:"예약대기"},
    {orderNum:"B01",orderDate:"2023-08-19",orderProduct:"닭가슴살 샌드위치",orderPrice:5000,orderState:"예약확인"},
    {orderNum:"C01",orderDate:"2023-08-11",orderProduct:"컵과일(소)",orderPrice:4500,orderState:"예약대기"},
    {orderNum:"D02",orderDate:"2023-08-20",orderProduct:"컵과일(중)",orderPrice:4500,orderState:"배송중"},
    {orderNum:"D03",orderDate:"2023-08-21",orderProduct:"오리훈제 샐러드",orderPrice:4500,orderState:"배송중"},
    {orderNum:"E01",orderDate:"2023-08-17",orderProduct:"건강쥬스",orderPrice:4500,orderState:"예약확인"},
    {orderNum:"E02",orderDate:"2023-08-18",orderProduct:"파인애플식초",orderPrice:4400,orderState:"배송완료"},
    {orderNum:"E03",orderDate:"2023-08-15",orderProduct:"과일도시락",orderPrice:4300,orderState:"배송준비중"},
    {orderNum:"F01",orderDate:"2023-05-18",orderProduct:"무슨 샐러드",orderPrice:4200,orderState:"예약확인"},
  ]

  const dummyOrderListNull =null;

  const checkDummy = (e) => { 
    alert(Boolean(dummyOrderListNull));
   }
  
  const orderTr = dummyOrderList.map((d,i) => 
  <tr>
    <td>{d.orderNum}</td>
    <td>{d.orderDate}</td>
    <td>{d.orderProduct}</td>
    <td>{d.orderPrice}</td>
    <td>{d.orderState}</td>
  </tr>
  )

   const param ={id:"아이디",password:"123456"}

   const checkParam = () => { 
    alert(JSON.stringify(param));
    }

  return (
    <>
      <p>주문/예약 내역</p>
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
          <button onClick={checkParam}>조회</button>
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
  );
};

export default MyOrder;
