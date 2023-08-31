import React, { useState, useEffect, useRef } from "react";
import Count from "../components/count";
import axios from "axios";
import "../styles/popupcart.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "../components/addmenuslice";
import { useNavigate } from "react-router-dom";

const Cuppopup = (props) => {
  const { productId, setPopupState, cupData = {} } = props;
  const [count, setCount] = useState(1);

  const navi = useNavigate();

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  const dispatch = useDispatch();
  const [added, setAdded] = useState({});

  const addMenu = () => {
    const a = Object.keys(added).length + 1;
    if (added[a] === undefined) {
      const newMenuData = {
        cupproductName: cupData.productName,
        counting: count,
      };

      setAdded({ ...added, [a]: newMenuData });
    } else {
      setAdded({
        ...added,
        [a + 1]: { cupproductName: cupData.productName, counting: count },
      });
    }
  };

  return (
    <div className="popupcart-wrapper">
      <button className="popupcart-close" onClick={() => setPopupState(false)}>
        x
      </button>
      <div className="popup-image">
        <img
          src={`http://localhost:8090/product/photo/${cupData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "300px" }}
        />
      </div>
      <h2 className="popupcart-productname">{cupData.productName}</h2>
      <h2 className="popupcart-productname">{cupData.productPrice}</h2>
      <div>
        <Count count={count} setCount={handleCountChange} />
        <span>
          <button
            onClick={() => {
              dispatch(addMenuData(added));
              navi("/purchase");
            }}
          >
            구매예약
          </button>
        </span>
        <button onClick={addMenu}>메뉴담기</button>
        <button
          onClick={() => {
            setAdded({});
          }}
        >
          메뉴 초기화
        </button>
        <div>
          {Object.keys(added).map((i) => (
            <div className="added-text" key={i}>
              <p>{i}</p>
              <p>상 품 명 : {added[i].productName}</p>
              <p>수 량: {added[i].counting}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cuppopup;
