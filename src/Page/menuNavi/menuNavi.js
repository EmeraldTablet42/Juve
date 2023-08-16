import React from "react";
import "./menuNavi.css";
import { Link } from "react-router-dom";
const MenuNavi = () => {
  return (
    <div>
      <table id="menuNavi" border={0}>
        <tr>
          <td></td>
          <td id="middle">
            <span><Link id="wholeCategory"  to='/category'>전체카테고리</Link></span>
            <span><Link  to='/salad'>주문방법</Link></span>
            <span><Link  to='/salad'>샐러드</Link></span>
            <span><Link  to='/fruit'>컵과일</Link></span>
            <span><Link  to='/sand'>샌드위치</Link></span>
            <span><Link  to='/juice'>주스</Link></span>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default MenuNavi;
