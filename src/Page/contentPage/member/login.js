import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { setAuth } from "./authSlice";

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

  return (
    <>
      <table className="loginTbl" border={1}>
        <tr>
          <td>회원 로그인</td>
          <td>
            <Link to="/loginUnsigned">비회원 주문조회</Link>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input
              name="id"
              value={loginInput.id}
              placeholder="아이디"
              onChange={handleLoginInput}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
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
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="checkbox" />
            아이디저장
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button onClick={getLoginToken}>로그인</button>
            <button
              onClick={() => {
                alert(localStorage.getItem("loginToken"));
              }}
            >
              조회
            </button>
            <button
              onClick={() => {
                alert(JSON.stringify(auth));
              }}
            >
              토큰값 확인
            </button>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <Link to="/signin">회원가입</Link>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a>아이디 찾기</a>
          </td>
          <td align="center">
            <a>비밀번호 찾기</a>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            ----간편하게 로그인----
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>네이버로 로그인</button>
          </td>
        </tr>
        <tr>
          <td align="center" colSpan={2}>
            <button>카카오로 로그인</button>
          </td>
        </tr>
      </table>
    </>
  );
};
export default Login;
