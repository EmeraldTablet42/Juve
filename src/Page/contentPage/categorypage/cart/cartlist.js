import React, { useState } from "react";
import Count from "../components/count";
import "../styles/cart.css";

const Cartlist = ({cartData}) => {
  //카운팅 useState부분에 받아온 데이터의 카운팅값을 기본값으로 넣을예정
  const [count, setCount] = useState(1);
  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };

  // redux데이터 부분
  return (
    <section className="cartlist">
      <div className="product-info">
        <div className="product-info-all">
          <div className="info-all-image">
            <img src="" alt="상품 이미지" />
          </div>
          <div className="info-all-detail">
            {cartData.map((menu, index) => (
              <div key={index}>
                <p>상품 이름: {menu.prductName}</p>
                <p>상품 가격: {menu.productPrice}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="product-info-count">
          <Count count={count} setCount={handleCountChange} />
        </div>
        <div className="product-info-purchase">
          <p>상품 총 금액</p>
          <button>
            <a href="/purchasecheck">구매예약</a>
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
