import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

export const LoginUnsigned = () => {
  return (
    <div className="login-wrapper">
      <div className="login-case">
        <div className="login-box">
          <h1>비회원 주문조회</h1>
          <div className="login-type">
            <div>
              <Link to="/member/login">회원 로그인</Link>
            </div>
            <div style={{backgroundColor:"greenyellow"}}>비회원 주문조회</div>
          </div>
          <div>
          <div className="unlogin-input">
              <input
                placeholder="주문자명"
              />
            </div>
            <div className="unlogin-input">
              <input
                placeholder="핸드폰번호(- 제외)"
              />
            </div>
            <div className="unlogin-input">
              <input
                placeholder="주문번호"
              />
            </div>
          </div>
          <div className="unlogin-btn">
            <button>확인</button>
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
