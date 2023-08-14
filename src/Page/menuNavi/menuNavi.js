import React from "react";
import "./menuNavi.css";
const MenuNavi = () => {
  return (
    <>
      <table id="menuNavi" border={0}>
        <tr>
          <td></td>
          <td id="middle">
            <span>전체 카테고리</span>
            <span>주문방법</span>
            <span>샐러드</span>
            <span>컵과일</span>
            <span>샌드위치</span>
            <span>음료</span>
          </td>
          <td></td>
        </tr>
      </table>
    </>
  );
};

export default MenuNavi;
