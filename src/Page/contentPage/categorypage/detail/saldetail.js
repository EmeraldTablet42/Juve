import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/saldetail.css";
import "../styles/scrollcss.css";
import { Link, useSearchParams } from "react-router-dom";
import Count from "../components/count";
import Movescroll from "../components/movescroll";
import sampleImage from "../static/saladsample.jpg";
import Purchase from "../purchase";

const Saldetail = () => {
  const [detailData] = useState({});
  const [salData, setSalData] = useState([]);
  const [sdrData, setSdrData] = useState([]);
  const [smtData, setSmtData] = useState([]);
  const [sstData, setSstData] = useState([]);
  const [ssmData, setSsmData] = useState([]);
  const [count, setCount] = useState(1);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };

  const [searchParam, setSearchParam] = useSearchParams();
  //데이터관련
  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setSalData(res.data);
      });
  }, [searchParam]);

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;
      const sdFilterData = allProduct.filter(
        (product) => product.category === "SDR"
      );
      setSdrData(sdFilterData);
      const smFilterData = allProduct.filter(
        (product) => product.category === "SMT"
      );
      setSmtData(smFilterData);
      const sstFilterData = allProduct.filter(
        (product) => product.category === "SST"
      );
      setSstData(sstFilterData);
      const ssmFilterData = allProduct.filter(
        (product) => product.category === "SSM"
      );
      setSsmData(ssmFilterData);
    });
  }, []);
  ////////////////

  //add menu
  const [check, setCheck] = useState({});

  const [smtValue, setSmtValue] = useState([]);
  const [sstValue, setSstValue] = useState([]);
  const [ssmValue, setSsmValue] = useState([]);

  const [added, setAdded] = useState({});

  const addMenu = () => {
    if (sdrValue === "") {
      alert("샐러드 드레싱을 선택해주세요");
    } else {
      const a = Object.keys(added).length + 1;

      if (added[a] === undefined) {
        setAdded({ ...added, [a]: { sdrValue, smtValue, sstValue, ssmValue } });
      } else {
        setAdded({
          ...added,
          [a + 1]: { sdrValue, smtValue, sstValue, ssmValue },
        });
      }
      setCheck({});
      setSdrValue("");
      setSmtValue([]);
      setSstValue([]);
      setSsmValue([]);
    }
  };
  //////////// 핸들러
  const handleSmtChange = (e) => {
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSmtValue((prevSmtValue) => [...prevSmtValue, e.target.name + ","]);
    } else {
      setSmtValue((prevSmtValue) =>
        prevSmtValue.filter((value) => value !== e.target.name)
      );
    }
  };

  const handleSstChange = (e) => {
    console.log(e.target);
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSstValue((prevSstValue) => [...prevSstValue, e.target.name + ","]);
    } else {
      setSstValue((prevSstValue) =>
        prevSstValue.filter((value) => value !== e.target.name)
      );
    }
  };

  const handleSsmChange = (e) => {
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSsmValue((prevSsmValue) => [...prevSsmValue, e.target.name + ","]);
    } else {
      setSsmValue((prevSsmValue) =>
        prevSsmValue.filter((value) => value !== e.target.name)
      );
    }
  };

  const [sdrValue, setSdrValue] = useState("");
  const handleSdrChange = (value) => {
    setSdrValue(value);
  };
  ///////////////////////////

  /////////////드롭다운
  const [isOpenSst, setIsOpenSst] = useState(false);
  const [isOpenSmt, setIsOpenSmt] = useState(false);
  const [isOpenSsm, setIsOpenSsm] = useState(false);

  // 팝억 여부 state
  const [popUp, setPopUp] = useState({
    smtPopup: false,
    sstPopup: false,
    ssmPopup: false,
  });

  const handlePopup = (e) => {
    setPopUp({ ...popUp, [e.target.id]: !popUp[e.target.id] });
  };

  const ref = useRef();

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenSmt(!isOpenSmt);
      }
    };
    if (isOpenSmt) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpenSmt]);

  const DropdownSmt = () => {
    setIsOpenSmt(!isOpenSmt);
    setIsOpenSst(false);
    setIsOpenSsm(false);
  };

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenSst(!isOpenSst);
      }
    };
    if (isOpenSst) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpenSst]);

  const DropdownSst = () => {
    setIsOpenSst(!isOpenSst);
    setIsOpenSmt(false);
    setIsOpenSsm(false);
  };
  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenSsm(!isOpenSsm);
      }
    };
    if (isOpenSsm) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpenSsm]);

  const DropdownSsm = () => {
    setIsOpenSsm(!isOpenSsm);
    setIsOpenSmt(false);
    setIsOpenSst(false);
  };
  ///////////////////
  const productTabs = {
    0: Movescroll("상품 상세"),
    1: Movescroll("리뷰"),
    2: Movescroll("상품 문의"),
    length: 3,
  };
  return (
    <div className="saldetail-wrapper">
      <div className="detail-high">
        <div className="detail-image">
          <img
            src={`http://localhost:8090/product/photo/${salData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "500px" }}
          />
        </div>
        <div className="product-data">
          <p>상 품 : {salData.productName}</p>
          <p>가 격 : {salData.productPrice}</p>
          <div className="sdrOption">
            <select
              className="selectsize"
              value={sdrValue}
              onChange={(e) => {
                handleSdrChange(e.target.value);
              }}
            >
              <option value="" hidden>
                샐러드 소스를 선택하세요
              </option>
              {sdrData.map(({ productCode, productName, productPrice }) => (
                <option
                  key={`sdr-${productCode}`}
                  value={productName}
                  data-price={productPrice}
                >
                  {productName}
                </option>
              ))}
            </select>
            <div className="dropdown" ref={ref}>
              <div
                id="smtPopup"
                className="dropdown-header"
                // onClick={DropdownSmt}
                onClick={handlePopup}
              >
                메인토핑 (다중 선택 가능)
              </div>
              {/* {isOpenSmt && ( */}
              {popUp.smtPopup && (
                <ul className="checkbox-list">
                  {smtData.map(({ productCode, productName, productPrice }) => (
                    <li key={`smt-${productCode}`}>
                      <label>
                        <input
                          name={productName}
                          checked={check[productCode] || false}
                          type="checkbox"
                          value={productCode}
                          onChange={handleSmtChange}
                        />
                        {productName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <div
                id="sstPopup"
                className="dropdown-header"
                // onClick={DropdownSst}
                onClick={handlePopup}
              >
                서브 토핑 (다중 선택 가능)
              </div>
              {/* {isOpenSst && ( */}
              {popUp.sstPopup && (
                <ul className="checkbox-list">
                  {sstData.map(({ productCode, productName, productPrice }) => (
                    <li key={`sst-${productCode}`}>
                      <label>
                        <input
                          type="checkbox"
                          name={productName}
                          checked={check[productCode] || false}
                          value={productCode}
                          onChange={handleSstChange}
                        />
                        {productName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <div
                id="ssmPopup"
                className="dropdown-header"
                // onClick={DropdownSsm}
                onClick={handlePopup}
              >
                보조 메뉴
              </div>
              {/* {isOpenSsm && ( */}
              {popUp.ssmPopup && (
                <ul className="checkbox-list">
                  {ssmData.map(({ productCode, productName, productPrice }) => (
                    <li key={`ssm-${productCode}`}>
                      <label>
                        <input
                          type="checkbox"
                          name={productName}
                          checked={check[productCode] || false}
                          value={productCode}
                          onChange={handleSsmChange}
                        />
                        {productName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
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
                  setSdrValue("");
                  setSmtValue([]);
                  setSstValue([]);
                  setSsmValue([]);
                }}
              >
                메뉴 초기화
              </button>
              <div>
                {Object.keys(added).map((i) => (
                  <div className="added-text" key={i}>
                    <p>{i}</p>
                    <p>샐러드드레싱 : {added[i].sdrValue}</p>
                    <p>메인 토핑: {added[i].smtValue}</p>
                    <p>서브 토핑: {added[i].sstValue}</p>
                    <p>보조 메뉴: {added[i].ssmValue}</p>
                  </div>
                ))}
              </div>
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
        {false && <Purchase addData={added} />}
        <div ref={productTabs[2].element}>
          <h1>상품 문의</h1>
        </div>
      </div>
    </div>
  );
};

export default Saldetail;
