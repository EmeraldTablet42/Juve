import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/saldetail.css";
import { useSearchParams } from "react-router-dom";
import Count from "../components/count";

const Wihdetail = () => {
  const [wihData, setWihData] = useState([]);
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);

  const [selectedWmtOptions, setSelectedWmtOptions] = useState([]);
  const [selectedWstOptions, setSelectedWstOptions] = useState([]);

  const [isOpenWmt, setIsOpenWmt] = useState(false);
  const [isOpenWst, setIsOpenWst] = useState(false);
  const [optionSelections, setOptionSelections] = useState({});

  const [count, setCount] = useState(1);

  const ref = useRef(null);

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
  const handleWmtChange = (productId) => {
    setSelectedWmtOptions((prevOptions) => {
      if (prevOptions.includes(productId)) {
        return prevOptions.filter((item) => item !== productId);
      } else {
        return [...prevOptions, productId];
      }
    });
  };

  const handleWstChange = (value) => {
    setSelectedWstOptions(value);
  };
  const Dropdownwmt = () => {
    setIsOpenWmt(!isOpenWmt);
  };

  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${wihData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "500px" }}
        />
      </div>
      <p>상 품 : {wihData.productName} </p>
      <p>가 격 : {wihData.productPrice} </p>
      <div className="sdrOption">
        <div className="dropdown" ref={ref}>
          <div className="dropdown-header" onClick={Dropdownwmt}>
            메인토핑 (다중 선택 가능)
          </div>
          {isOpenWmt && (
            <ul className="checkbox-list">
              {wmtData.map(({ productId, productName, productPrice }) => (
                <li key={`wmt-${productId}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={productId}
                      onChange={(e) => handleWmtChange(e.target.value)}
                    />
                    {productName}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <div className="submenu">
            <select
            onChange={(e) =>{
              handleWstChange(e.target.value);
            }}>
              <option value="" hidden>
                옵션을 선택하세요
              </option>
            {wstData.map(({ productId, productName, productPrice }) => (
                  <option
                    key={`wst-${productId}`}
                    value={productName}
                    data-price={productPrice}
                  >
                    {productName}
                  </option>
            ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <Count count={count} setCount={setCount} />
        <button>구매예약</button>
      </div>
    </div>
  );
};

export default Wihdetail;
