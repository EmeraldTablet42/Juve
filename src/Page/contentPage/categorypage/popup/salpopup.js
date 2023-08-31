import React, { useState, useEffect, useRef } from "react";
import Count from "../components/count";
import axios from "axios";
import '../styles/popupcart.css';
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "../components/addmenuslice";
import { useNavigate } from "react-router-dom";

const Salpopup = (props) => {
  const { productId, setPopupState, salData = {} } = props;
  const [count, setCount] = useState(1);
  const addMenuDataSel = useSelector((state) => state.menu);

  const navi = useNavigate();
  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
   //redux
   const dispatch = useDispatch();
   
  //added
  const [check, setCheck] = useState({});

  const [sdrValue, setSdrValue] = useState("");
  const [smtValue, setSmtValue] = useState([]);
  const [sstValue, setSstValue] = useState([]);
  const [ssmValue, setSsmValue] = useState([]);

  const [added, setAdded] = useState({});

  const addMenu = () => {
    if (sdrValue === "") {
      alert("샐러드 드레싱을 선택해주세요");
    } 
    const a = Object.keys(added).length + 1;
    if (added[a] === undefined) {
      const newMenuData = {
        sdrValue,
        smtValue,
        sstValue,
        ssmValue,
        salproductName: salData.productName,
        counting: count,
      };
      setAdded({ ...added, [a]: newMenuData })
      } else {
        setAdded({
          ...added,
          [a + 1]: { salproductName:salData.productName, sdrValue, smtValue, sstValue, ssmValue, counting:count },
        });
      }
      setCheck({});
      setSdrValue("");
      setSmtValue([]);
      setSstValue([]);
      setSsmValue([]);
    };
  
  //옵션데이터
  const [sdrData, setSdrData] = useState([]);
  const [smtData, setSmtData] = useState([]);
  const [sstData, setSstData] = useState([]);
  const [ssmData, setSsmData] = useState([]);
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
    setPopUp({ [e.target.id]: !popUp[e.target.id] });
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
  return (
    <div className="popupcart-wrapper">
      <button className="popupcart-close" onClick={() => setPopupState(false)}>
        x
      </button>
      <div className="popup-image">
          <img
            src={`http://localhost:8090/product/photo/${salData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "300px" }}
          />
        </div>
      <h2 >{salData.productName}</h2>
      <h2 >{salData.productPrice}</h2>
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
                  dispatch(addMenuData(added));
                  navi("/purchase");
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
                <p>상 품 명 : {added[i].productName}</p>
                <p>샐러드드레싱 : {added[i].sdrValue}</p>
                <p>메인 토핑: {added[i].smtValue}</p>
                <p>서브 토핑: {added[i].sstValue}</p>
                <p>보조 메뉴: {added[i].ssmValue}</p>
                <p>수 량: {added[i].counting}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salpopup;
