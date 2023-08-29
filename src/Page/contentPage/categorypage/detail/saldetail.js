import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/saldetail.css";
import { useSearchParams } from "react-router-dom";
import Count from "../components/count";

const Saldetail = () => {
  const [detailData] = useState({});
  const [salData, setSalData] = useState([]);
  const [sdrData, setSdrData] = useState([]);
  const [smtData, setSmtData] = useState([]);
  const [sstData, setSstData] = useState([]);
  const [ssmData, setSsmData] = useState([]);
  const [slectedData, setSelectedData] = useState([]);
  const [count, setCount] = useState(1);

  const [selectedSmtOptions, setSelectedSmtOptions] = useState([]);
  const [selectedSstOptions, setSelectedSstOptions] = useState([]);
  const [selectedSsmOptions, setSelectedSsmOptions] = useState([]);

  const [isOpenSst, setIsOpenSst] = useState(false);
  const [isOpenSmt, setIsOpenSmt] = useState(false);
  const [isOpenSsm, setIsOpenSsm] = useState(false);

  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setSalData(res.data);
      });
  }, [searchParam]);

  const ref = useRef(null);
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

  const handleSmtChange = (e) => {
    // alert(e.target.checked);
    setCheck({ ...check, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setSmtValue((prevSmtValue) => [...prevSmtValue, e.target.value + "^"]);
    } else {
      setSmtValue((prevSmtValue) =>
        prevSmtValue.filter((value) => value !== e.target.value)
      );
    }
  };

  const handleSstChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setSstValue((prevSstValue) => [...prevSstValue, e.target.value + "^"]);
    } else {
      setSstValue((prevSstValue) =>
        prevSstValue.filter((value) => value !== e.target.value)
      );
    }
  };

  const handleSsmChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
    if (e.target.checked) {
      setSsmValue((prevSsmValue) => [...prevSsmValue, e.target.value + "^"]);
    } else {
      setSsmValue((prevSsmValue) =>
        prevSsmValue.filter((value) => value !== e.target.value)
      );
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [sdrValue, setSdrValue] = useState("");
  const handleSdrChange = (value) => {
    // setSdrData(value)
    setSdrValue(value);
  };
  const DropdownSmt = () => {
    setIsOpenSmt(!isOpenSmt);
  };
  const DropdownSst = () => {
    setIsOpenSst(!isOpenSst);
  };
  const DropdownSsm = () => {
    setIsOpenSsm(!isOpenSst);
  };

  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${salData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "500px" }}
        />
      </div>
      <p>상 품:{salData.productName}</p>
      <p>가 격:{salData.productPrice}</p>
      <div className="sdrOption">
        <select
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
          <div className="dropdown-header" onClick={DropdownSmt}>
            메인토핑 (다중 선택 가능)
          </div>
          {isOpenSmt && (
            <ul className="checkbox-list">
              {smtData.map(({ productCode, productName, productPrice }) => (
                <li key={`smt-${productCode}`}>
                  <label>
                    <input
                      name={productCode}
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
          <div className="dropdown-header" onClick={DropdownSst}>
            서브 토핑 (다중 선택 가능)
          </div>
          {isOpenSst && (
            <ul className="checkbox-list">
              {sstData.map(({ productCode, productName, productPrice }) => (
                <li key={`sst-${productCode}`}>
                  <label>
                    <input
                      type="checkbox"
                      name={productCode}
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
          <div className="dropdown-header" onClick={DropdownSsm}>
            보조 메뉴
          </div>
          {isOpenSsm && (
            <ul className="checkbox-list">
              {ssmData.map(({ productCode, productName, productPrice }) => (
                <li key={`ssm-${productCode}`}>
                  <label>
                    <input
                      type="checkbox"
                      name={productCode}
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
          <Count count={count} setCount={setCount} />
          <button>구매예약</button>
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
              <div key={i}>
                <p>{i}</p>
                <p>샐러드드레싱 : {added[i].sdrValue}</p>
                <p>메인토핑: {added[i].smtValue}</p>
                <p>서브토핑: {added[i].sstValue}</p>
                <p>서브메뉴: {added[i].ssmValue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saldetail;
