import React, { useEffect, useState } from "react";
import "../Page/css/menuNavi.css";
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
              <span><Link  to='/salad'>샐러드</Link></span>
              <span><Link  to='/fruit'>컵과일</Link></span>
              <span><Link  to='/sand'>샌드위치</Link></span>
              <span><Link  to='/juice'>주스</Link></span>
            </nav>
          </td>
      </table>
    </div>
  );
};

export default MenuNavi;
