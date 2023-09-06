import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrder } from "../order/purchaseSlice";

export const LoginUnsigned = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [params, setParams] = useState({ name: "", phone: "", orderCode: "" });
  const handleParams = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const getOrder = () => {
    const fd = new FormData(); 
    fd.set("orderCode",params.orderCode);
    fd.set("phone",params.phone);
    fd.set("name",params.name);
    axios.post(`http://localhost:8090/order/get.order.unsigned`,fd)
    .then((res) => {
      if(!res.data){
        alert("존재하지 않는 주문이거나, 주문정보를 잘못 입력하셨습니다.");
        return null;
      }
      // alert(JSON.stringify(res.data));
      dispatch(setOrder(res.data));
      navi("/purchasecheck");
     }).catch(() => { 
      alert("DB통신에러. 잠시 후 다시 시도해주세요");
      })


   }

  return (
    <div className="login-wrapper">
      <div className="login-case">
        <div className="login-box">
          <h1>비회원 주문조회</h1>
          <div className="login-type">
            <div>
              <Link to="/member/login">회원 로그인</Link>
            </div>
            <div style={{ backgroundColor: "greenyellow" }}>
              비회원 주문조회
            </div>
          </div>
          <div>
            <div className="unlogin-input">
              <input
                name="name"
                value={params.name}
                onChange={handleParams}
                placeholder="주문자명"
              />
            </div>
            <div className="unlogin-input">
              <input
                name="phone"
                value={params.phone}
                onChange={handleParams}
                placeholder="핸드폰번호(- 포함)"
              />
            </div>
            <div className="unlogin-input">
              <input
                name="orderCode"
                value={params.orderCode}
                onChange={handleParams}
                placeholder="주문번호 (대소문자 유의)"
              />
            </div>
          </div>
          <div className="unlogin-btn">
            <button onClick={getOrder}>확인</button>
          </div>
          <div className="login-join">
            <Link to={"/join"}>
              <button>회원가입</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
