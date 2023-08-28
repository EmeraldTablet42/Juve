import React, { useEffect } from "react";

function SessionSucceeding() {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "local-temp" && sessionStorage.getItem("loginToken")) {
        // 로컬 스토리지에 데이터를 저장한 후 바로 삭제
        localStorage.setItem(
          "local-loginToken",
          sessionStorage.getItem("loginToken")
        );
        localStorage.removeItem("local-loginToken");
      } else if (
        event.key === "local-loginToken" &&
        !sessionStorage.getItem("loginToken")
      ) {
        // 로컬 스토리지에 저장한 데이터를 세션 스토리지에 저장
        const data = event.newValue;
        sessionStorage.setItem("loginToken", data);
        // 컴포넌트를 다시 마운트하도록 변경
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      // 컴포넌트가 언마운트될 때 다시 마운트되지 않도록 변경
    };
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("loginToken")) {
      localStorage.setItem("local-temp", "1");
      localStorage.removeItem("local-temp");
    }
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          sessionStorage.setItem("loginToken", "초기값");
        }}
      >
        {" "}
        생성{" "}
      </button>
      <button
        onClick={() => {
          alert(sessionStorage.getItem("loginToken"));
        }}
      >
        {" "}
        확인{" "}
      </button>
    </div>
  );
}

export default SessionSucceeding;
