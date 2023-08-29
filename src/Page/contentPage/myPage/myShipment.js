import React from "react";
import { useNavigate } from "react-router-dom";

const MyShipment = () => {

  const navi = useNavigate();

  return (
    <>
      <div className="titleArea">
        <h2 style={{ display: "inline-block" }}>배송지관리</h2>
        <p style={{ display: "inline-block" }}>
          최대 5개의 배송지를 등록하실 수 있습니다.
        </p>
      </div>
      <div className="shipmentTblDiv">
        <table border={1} className="shipmentTbl">
          <tr>
            <th>배송지명</th>
            <th>수령인</th>
            <th>휴대전화</th>
            <th>일반전화</th>
            <th>주소</th>
            <th>수정</th>
          </tr>
        </table>
        <button onClick={() => { navi("/member/mypage/myshipment/add") }}>배송지 등록</button>
      </div>
    </>
  );
};

export default MyShipment;
