import React from "react";
import { useParams } from "react-router";


const Cupdetail = () => {
  const { productId } = useParams;
  console.log(productId);
  return (
    <div className="Cupdetail-wrapper">
          <div className="Cupdetail-image">
            <img
              src={`http://localhost:8090/product/photo/${productId.productPhoto}`}
              alt="상품 이미지"
              style={{ width: "500px" }}
            />
          </div>
          <div className="Option">
            <p>상품명 : {productId.productName}</p>
            <p>가 격 : {productId.productPrice}</p>
          </div>
    </div>
  );
};

export default Cupdetail;
