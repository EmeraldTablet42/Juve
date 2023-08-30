import React, { useEffect, useState } from "react";
import "../css/menuNavi.css";
import { Link } from "react-router-dom";

const MenuNavi = () => {
  const [isnavFIxed, setnavFixed] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if  (window.scrollY > 80) {
        setnavFixed(true);
      }else {
        setnavFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <table className="menuNavi" border={0}>
          <td className="middle">
            <nav className={isnavFIxed ? 'fixed' : ''}>
              <span><Link className="wholeCategory"  to='/category'>전체카테고리</Link></span>
              {/* <span><Link  to='/salad'>샐러드</Link></span> */}
              <span><a href="/salad">샐러드</a></span>
              <span><a  href='/fruit'>컵과일</a></span>
              <span><a  href='/sand'>샌드위치</a></span>
              <span><a  href='/juice'>주스</a></span>
            </nav>
          </td>
      </table>
    </div>
  );
};

export default MenuNavi;
