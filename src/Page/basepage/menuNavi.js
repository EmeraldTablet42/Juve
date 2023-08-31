import React, { useEffect, useState } from "react";
import "../css/menuNavi.css";
import { Link } from "react-router-dom";

const MenuNavi = () => {
  const [isNaviFixed,setIsNaviFixed ] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsNaviFixed(true);
      } else {
        setIsNaviFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="naviBackground">
      <div className={!isNaviFixed?"naviMenu":"naviMenu naviMenu_fixed"}>
          <span>
            <Link className="wholeCategory" to="/category">
              전체카테고리
            </Link>
          </span>
          {/* <span><Link  to='/salad'>샐러드</Link></span> */}
          <span>
            <a href="/salad">샐러드</a>
          </span>
          <span>
            <Link to="/fruit">컵과일</Link>
          </span>
          <span>
            <Link to="/sand">샌드위치</Link>
          </span>
          <span>
            <Link to="/juice">주스</Link>
          </span>
      </div>
    </div>
  );
};

export default MenuNavi;
