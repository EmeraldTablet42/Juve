import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


const Bevdetail = (detailData) => {
  const [bevData, setBevData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    axios.get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`).then((res) => {
      setBevData(res.data)
    });
  }, []);
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
        </div>
      </div>
  );
};

export default Bevdetail;