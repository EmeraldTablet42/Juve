import React from 'react';
import juveimage from '../imagefile/juvefooter.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="company-logo">
        <img src={juveimage} alt="로고" />
      </div>
      <div className="company-info">회사정보</div>
    </div>
  );
};

export default Footer;
