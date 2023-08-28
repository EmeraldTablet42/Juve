import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Count from "../components/count";


const Cupdetail = (detailData) => {
  const [cupData, setCupData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [count, setCount] = useState(1);


  useEffect(() => {
    axios.get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`).then((res) => {
      setCupData(res.data)
    });
  }, []);
  
  const handleClick = () => {
    const totalPrice = parseInt(cupData.productPrice) * count;
    alert(`상품명:${cupData.productName}\n상품가격:${cupData.productPrice}\n구매갯수: ${count}\n총 가격:${totalPrice}`);
};
  

  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${cupData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "500px" }}
        />
      </div>
      <div className="sdrOption">
        <p>상품명 : {cupData.productName}</p>
        <p>가  격 : {cupData.productPrice}</p>
        <Count count={count} setCount={setCount}/>
      </div>
      <div>
        <button onClick={handleClick}>구매예약</button>
      </div>

      </div>
  );
};

export default Cupdetail;