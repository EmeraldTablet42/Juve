import React from "react";
import juveimage from "../imagefile/juvefooter.png";
import "./footer.css";
import { FooterText } from "./footerText";
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-main">
        <div className="company-logo">
          <img src={juveimage} alt="로고" />
        </div>
        <div className="company-info">
          <FooterText />
        </div>
      </div>
    </div>
  );
};

export default Footer;
