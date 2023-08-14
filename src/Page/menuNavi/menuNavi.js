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
            <Link className='navbarcate' to='/category'>전체카테고리</Link>
            <Link className='navbarcate' to='/salad'>샐러드</Link>
            <Link className='navbarcate' to='/fruit'>컵과일</Link>
            <Link className='navbarcate' to='/sand'>샌드위치</Link> 
            <Link className='navbarcate' to='/juice'>주스</Link>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default MenuNavi;
