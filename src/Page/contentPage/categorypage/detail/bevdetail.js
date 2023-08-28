import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Count from "../components/count";

const Bevdetail = (detailData) => {
  const [bevData, setBevData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [count, setCount] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`).then((res) => {
      setBevData(res.data)
    });
  }, []);
  const handleClick = () => {
    const totalPrice = parseInt(bevData.productPrice) * count;
    alert(`상품명:${bevData.productName}\n상품가격:${bevData.productPrice}\n구매갯수: ${count}\n총 가격:${totalPrice}`);
};
  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${bevData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "500px" }}
        />
      </div>
      <div className="sdrOption">
        <p>상품명 : {bevData.productName}</p>
        <p>가  격 : {bevData.productPrice}</p>
          <Count count={count} setCount={setCount}/>
        </div>
        <div>
          <button onClick={handleClick}>구매예약</button>
        </div>
      </div>
  );
};

export default Bevdetail;