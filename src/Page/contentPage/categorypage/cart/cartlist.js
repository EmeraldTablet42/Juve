import React, { useState } from "react";
import Count from "../components/count";
import Purchasecheck from "../purchasecheck";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart.css";
const Cartlist = () => {
  const dummyData = {
    productName: "샐러드",
    productPrice: "3000원",
  };
  //카운팅 useState부분에 받아온 데이터의 카운팅값을 기본값으로 넣을예정
  const [count, setCount] = useState(1);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };

  // redux데이터 부분
  const dispatch = useDispatch();
  const addedMenus = useSelector((state) => state.menu);

  return (
    <section className="cartlist">
      <div className="product-info">
        <div className="product-info-all">
          <div className="info-all-image">
            <img src="" alt="상품 이미지" />
          </div>
          <div className="info-all-detail">
            <p>{dummyData.productName}</p>
            <p>상품 옵션</p>
            <p>{dummyData.productPrice}</p>
          </div>
        </div>
        <div className="product-info-count">
          <Count count={count} setCount={handleCountChange} />
        </div>
        <div className="product-info-purchase">
          <p>상품 총 금액</p>
          <button
            onClick={(e) => {
              <Purchasecheck />;
            }}
          >
            주문하기
          </button>
        </div>
        <div className="product-info-delete">
          <button>x</button>
        </div>
      </div>
    </section>
  );
};

export default Cartlist;
