import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenRefresher = () => {
  const navi = useNavigate();

  useEffect(() => {
    // 컴포넌트 이동 확인용
    // alert("컴포넌트 마운트됨");
    // 컴포넌트가 마운트될 때마다 토큰을 갱신하도록 한다.

    const refreshToken = async () => {
      try {
        await axios
          .get(
            `http://localhost:8090/member.get.refreshToken?token=${sessionStorage.getItem(
              "loginToken"
            )}`
          )
          .then((res) => {
            const newToken = res.data.token;
            if (newToken) {
              sessionStorage.setItem("loginToken", newToken);
            } else {
              alert("장시간 대기로 인해 로그인 시간이 만료되었습니다.");
              sessionStorage.removeItem("loginToken");
              window.location.replace("/");
            }
          });
      } catch (error) {
        alert(error);
        alert("로그인 갱신 오류");
      }
    };
    if (sessionStorage.getItem("loginToken")) {
      refreshToken();
    }
  }, [navi]);

  return null;
};

export default TokenRefresher;
