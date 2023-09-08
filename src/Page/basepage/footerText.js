import React from "react";
import "./footer.css";
export const FooterText = () => {
  const inText = `
상호 : 주식회사 허슬앤
대표 : 윤태훈
주소 : 충청남도 천안시 동남구 은행길 5-4, 3층
전화 : 070-4076-7890
메일 : apple@fruitsinthecity.co.kr
사업자번호 : 278-88-00557
이용약관 : 이용약관 보기▶
통신판매번호 : 제2016-충남천안-0872호`;
  return (
    <textarea className="footer-company" readOnly>
      {inText}
    </textarea>
  );
};
