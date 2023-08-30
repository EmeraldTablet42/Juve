import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/saldetail.css";
import "../styles/scrollcss.css";
import { Link, useSearchParams } from "react-router-dom";
import Count from "../components/count";
import Movescroll from "../components/movescroll";
import sampleImage from "../static/sand.png";

const Wihdetail = () => {
  const [wihData, setWihData] = useState([]);
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);


  const [isOpenWmt, setIsOpenWmt] = useState(false);
  const [isOpenWst, setIsOpenWst] = useState(false);

  const [count, setCount] = useState(1);
  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  const ref = useRef(null);

  const [check, setCheck] = useState({});

  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setWihData(res.data);
      });
  }, [searchParam]);

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenWmt(!isOpenWmt);
      }
    };
    if (isOpenWmt) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpenWmt]);

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenWst(!isOpenWst);
      }
    };
    if (isOpenWst) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpenWst]);

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;
      const wmtFilterData = allProduct.filter(
        (product) => product.category === "WMT"
      );
      setWmtData(wmtFilterData);
      const wstFilterData = allProduct.filter(
        (product) => product.category === "WST"
      );
      setWstData(wstFilterData);
    });
  }, []);
  const [wmtValue, setWmtValue] = useState([]);
  
  const handleWmtChange = (e) => {
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setWmtValue((prevWmtValue) => [...prevWmtValue, e.target.name + ","]);
    } else {
      setWmtValue((prevWmtValue) =>
        prevWmtValue.filter((value) => value !== e.target.name)
      );
    }
  };
  const [wstValue, setWstValue] = useState([]);

  const handleWstChange = (e) => {
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setWstValue((prevWstValue) => [...prevWstValue, e.target.name + ","]);
    } else {
      setWstValue((prevWstValue) =>
        prevWstValue.filter((value) => value !== e.target.name)
      );
    }
  };

  const DropdownWmt = () => {
    setIsOpenWmt(!isOpenWmt);
    setIsOpenWst(false);
  };
  const DropdownWst = () => {
    setIsOpenWst(!isOpenWst);
    setIsOpenWmt(false);
  };

  const [added, setAdded] = useState({});

  const addMenu = () => {
      const a = Object.keys(added).length + 1;

      if (added[a] === undefined) {
        setAdded({ ...added, [a]: { wmtValue, wstValue} });
      } else {
        setAdded({
          ...added,
          [a + 1]: { wmtValue, wstValue},
        });
      }
      setCheck({});
      setWmtValue([]);
      setWstValue([]);
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
            src={`http://localhost:8090/product/photo/${wihData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "500px" }}
          />
        </div>
        <div className="product-data">
          <p>상 품 : {wihData.productName} </p>
          <p>가 격 : {wihData.productPrice} </p>
          <div className="sdrOption">
            <div className="dropdown" ref={ref}>
              <div className="dropdown-main" onClick={DropdownWmt}>
                메인토핑 (다중 선택 가능)
              </div>
              {isOpenWmt && (
                <ul className="checkbox-list">
                  {wmtData.map(({ productCode, productName, productPrice }) => (
                    <li key={`wmt-${productCode}`}>
                      <label>
                        <input
                          name={productName}
                          checked={check[productCode] || false}
                          type="checkbox"
                          value={productCode}
                          onChange={handleWmtChange}
                        />
                        {productName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <div className="dropdown-sub" onClick={DropdownWst}>
                서브 토핑
              </div>
              {isOpenWst && (
                <ul className="checkbox-list">
                  {wstData.map(({ productCode, productName, productPrice }) => (
                    <li key={`wst-${productCode}`}>
                      <label>
                        <input
                          name={productName}
                          checked={check[productCode] || false}
                          type="checkbox"
                          value={productCode}
                          onChange={handleWstChange}
                        />
                        {productName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <Count count={count} setCount={handleCountChange} />
            <span>
              <button
                onClick={() => {
                  const hasCheckedOption = Object.values(check).some(
                    (isChecked) => isChecked
                  );
                  if (hasCheckedOption || Object.keys(added).length !== 0) {
                    window.location.href = "/purchase";
                  } else {
                    alert("옵션을 선택하세요");
                  }
                }}
              >
                구매예약
              </button>
            </span>
            <button onClick={addMenu}>메뉴담기</button>
            <button
              onClick={() => {
                setAdded({});
                setCheck({});
                setWmtValue([]);
                setWstValue([]);
              }}
            >
              메뉴 초기화
            </button>
            <div>
                {Object.keys(added).map((i) => (
                  <div className="added-text" key={i}>
                    <p>{i}</p>
                    <p>메인 토핑: {added[i].wmtValue}</p>
                    <p>서브 토핑: {added[i].wstValue}</p>
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

export default Wihdetail;
