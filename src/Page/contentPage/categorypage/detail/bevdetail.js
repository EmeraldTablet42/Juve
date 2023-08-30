import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Count from "../components/count";
import Movescroll from "../components/movescroll";
import sampleImage from "../static/bev.jpg";
import "../styles/scrollcss.css";

const Bevdetail = (detailData) => {
  const [bevData, setBevData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [count, setCount] = useState(1);
  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setBevData(res.data);
      });
  }, []);
  const handleClick = () => {
    const totalPrice = parseInt(bevData.productPrice) * count;
    alert(
      `상품명:${bevData.productName}\n상품가격:${bevData.productPrice}\n구매갯수: ${count}\n총 가격:${totalPrice}`
    );
  };
  const productTabs = {
    0: Movescroll("상품 상세"),
    1: Movescroll("리뷰"),
    2: Movescroll("상품 문의"),
    length: 3,
  };
  return (
    <div className="saldetail-wrapper">
      <div className="detail-high">
        <div className="saldetail-image">
          <img
            src={`http://localhost:8090/product/photo/${bevData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "500px" }}
          />
        </div>
        <div className="product-data">
          <div className="sdrOption">
            <p>상 품 : {bevData.productName}</p>
            <p>가 격 : {bevData.productPrice}</p>
            <Count count={count} setCount={handleCountChange} />
          </div>
          <div>
            <span>
              <Link to="/purchase">구매예약</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="scroll-buttons">
        {Array.from(Array(productTabs.length).keys()).map((index) => (
          <div
            className="scrollMove"
            style={{ display: "grid" }}
            key={index}
            onClick={productTabs[index].moveToElement}
          >
            {productTabs[index].element.current &&
              productTabs[index].element.current.textContent}
          </div>
        ))}
      </div>
      <div>
        <div ref={productTabs[0].element}>
          <h1 style={{ display: "none" }}>상품상세</h1>
          <img src={sampleImage} style={{ width: "100%" }} alt="상품이미지" />
        </div>

        <div ref={productTabs[1].element}>
          <h1>리뷰</h1>
        </div>

        <div ref={productTabs[2].element}>
          <h1>상품 문의</h1>
        </div>
      </div>
    </div>
  );
};

export default Bevdetail;
