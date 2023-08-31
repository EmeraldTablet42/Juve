import React, { useState } from "react";
import Count from "../components/count";
import '../styles/popupcart.css';
import { Link } from "react-router-dom";
const Bevpopup = (props) => {
  const { productId, setPopupState, bevData = {} } = props;
  const [count, setCount] = useState(1);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };

  
  return (
    <div className="popupcart-wrapper">
      <button className="popupcart-close" onClick={() => setPopupState(false)}>
        x
      </button>
      <div className="popup-image">
          <img
            src={`http://localhost:8090/product/photo/${bevData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "300px" }}
          />
        </div>
      <h2 className="popupcart-productname">{bevData.productName}</h2>
      <h2 className="popupcart-productname">{bevData.productPrice}</h2>
      <div className="sdrOption">
        <div>
          <Count count={count} setCount={handleCountChange} />
          <span>
            <button>
              <Link to ="/purchase">구매예약</Link>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Bevpopup;
