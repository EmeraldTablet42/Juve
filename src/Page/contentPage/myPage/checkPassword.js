import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckPassword = () => {
  const navi = useNavigate();
  const auth = useSelector((state) => state.authindex);
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const fd = new FormData();

  fd.append("idToken", sessionStorage.getItem("loginToken"));
  fd.append("password", password);

  const confimPassword = async() => {
    await axios.post("http://localhost:8090/member.checkPassword", fd).then((res) => {
      if (res.data === "Correct") {
        sessionStorage.setItem("passwordCheck", true);
        // alert("비밀번호 확인 성공!");
        window.location.reload();
      } else {
        alert("비밀번호가 올바르지 않습니다.");
      }
    });
  };

  return (
    <>
      <div>
        <h3>비밀번호 확인</h3>
        <div>
          <p>
            {auth.memberId}님의 회원정보를 안전하게 보호하기 위해
            <br />
            비밀번호를 한번 더 확인해 주세요.
          </p>
          <p>
            <label>비밀번호</label>
            <input
              name="passwordConfirm"
              value={password}
              type="password"
              onChange={handlePassword}
            />
          </p>
          <div>
            <button onClick={confimPassword}>확인</button>
            <button
              onClick={() => {
                alert(sessionStorage.getItem("passwordCheck"));
              }}
            >
              세션조회
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckPassword;
