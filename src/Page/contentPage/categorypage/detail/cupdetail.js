import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Count from "../components/count";
import Movescroll from "../components/movescroll";
import sampleImage from "../static/cup.jpg";
import "../styles/scrollcss.css";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "../components/addmenuslice";
import { useNavigate } from "react-router-dom";

const Cupdetail = (detailData) => {
  const [cupData, setCupData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
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
  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setCupData(res.data);
      });
  }, []);

  const handleClick = () => {
    const totalPrice = parseInt(cupData.productPrice) * count;
    alert(
      `상품명:${cupData.productName}\n상품가격:${cupData.productPrice}\n구매갯수: ${count}\n총 가격:${totalPrice}`
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
            src={`http://localhost:8090/product/photo/${cupData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "500px" }}
          />
        </div>
        <div className="product-data">
          <div className="sdrOption">
            <p>상 품 : {cupData.productName}</p>
            <p>가 격 : {cupData.productPrice}</p>
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

export default Cupdetail;
