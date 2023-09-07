import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { setAuth } from "./authSlice";
import { setRecoms } from "../../index/recomSlice";

const Login = () => {
  const navi = useNavigate();
  const myDispatch = useDispatch();
  const auth = useSelector((state) => state.authindex);

  //아이디 비밀번호 input State
  const [loginInput, setLoginInput] = useState({ id: "", password: "" });
  //아이디 비밀번호 입력 핸들러
  const handleLoginInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };
  const fd = new FormData();
  fd.append("id", loginInput.id);
  fd.append("password", loginInput.password);

  const getLoginToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/member.get.loginToken",
        fd
      );
      if (response.data.token === undefined) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        setLoginInput({ ...loginInput, password: "" });
      } else {
        // alert(response.data.token);
        sessionStorage.setItem("loginToken", response.data.token);
        await checkIsLogined(sessionStorage.getItem("loginToken")); // checkIsLogined 함수 호출 추가
        getGenAgeAndSetRecom();
        navi(-1);
      }
    } catch (error) {
      alert(error + "(1)");
      alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요.(1)");
      window.location.replace("/");
    }
  };

  const checkIsLogined = async (data) => {
    try {
      const checkRes = await axios.get(
        `http://localhost:8090/member.get.loginedMember?token=${data}`
      );
      if (checkRes.data.id) {
        myDispatch(setAuth({ isLogined: true, memberId: checkRes.data.id }));
        sessionStorage.setItem("login", true);
      } else {
        // 처리할 내용이 있는 경우
      }
    } catch (error) {
      alert(error + "(2)");
      alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요.(2)");
      window.location.replace("/");
    }
  };

  const getGenAgeAndSetRecom = () => {
    if (sessionStorage.getItem("loginToken") !== null) {
      axios
        .get(
          `http://localhost:8090/member.get.loginedMemberGenAge?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          // alert(JSON.stringify(res.data));
          axios
            .get(
              `http://localhost:42424/get_scores?age=${
                Math.floor(res.data.age / 10) * 10
              }&gender=${res.data.gender}`
            )
            .then((res) => {
              // alert(JSON.stringify(res.data));
              myDispatch(setRecoms(res.data));
            });
        });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-case">
        <div className="login-box">
          <h1>로 그 인</h1>
          <div className="login-type">
            <div style={{ backgroundColor: "greenyellow" }}>회원 로그인</div>
            <div>
              <Link to="/loginUnsigned">비회원 주문조회</Link>
            </div>
          </div>
          <div className="login-input-box">
            <div className="login-input">
              <input
                name="id"
                value={loginInput.id}
                placeholder="아이디"
                onChange={handleLoginInput}
              />
            </div>
            <div className="login-input">
              <input
                name="password"
                value={loginInput.password}
                placeholder="비밀번호"
                onChange={handleLoginInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getLoginToken();
                  }
                }}
                type="password"
              />
            </div>
          </div>
          <div className="login-save">
            <div className="login-save-check">
              <input type="checkbox" />
              아이디저장
            </div>
            <div className="find-id">
              <span>아이디 찾기</span>
            </div>
            <div className="find-pw">
              <span>비밀번호 찾기</span>
            </div>
          </div>
          <div className="login-btn">
            <div>
              <button onClick={getLoginToken}>로그인</button>
            </div>
            {/*<div>
              <button
                onClick={() => {
                  alert(localStorage.getItem("loginToken"));
                }}
              >
                조회
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  alert(JSON.stringify(auth));
                }}
              >
                토큰값 확인
              </button>
              </div>*/}
          </div>
          <div className="login-join">
            <Link to={"/join"}>
              <button>회원가입</button>
            </Link>
          </div>
          <div className="login-text">
            <p>------------간편하게 로그인------------</p>
          </div>
          <div className="naver">
            <button>네이버로 로그인</button>
          </div>
          <div className="kakao">
            <button>카카오로 로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
