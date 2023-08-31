import React, { useState, useEffect, useRef } from "react";
import Count from "../components/count";
import axios from "axios";
import "../styles/popupcart.css";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData } from "../components/addmenuslice";
import { useNavigate } from "react-router-dom";
const Wihpopup = (props) => {
  const { productId, setPopupState, wihData = {} } = props;
  const [count, setCount] = useState(1);
  const addMenuDataSel = useSelector((state) => state.menu);

  /// navi
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

  const [added, setAdded] = useState({});
  const [wmtValue, setWmtValue] = useState([]);
  const [wstValue, setWstValue] = useState([]);

  const addMenu = () => {
    const a = Object.keys(added).length + 1;

    if (added[a] === undefined) {
      const newMenuData = {
        wmtValue,
        wstValue,
        wihproductName: wihData.productName,
        counting: count,
      };
      setAdded({ ...added, [a]: newMenuData });
    } else {
      setAdded({
        ...added,
        [a + 1]: {
          wmtValue,
          wstValue,
          wihproductName: wihData.productName,
          counting: count,
        },
      });
    }
    setCheck({});
    setWmtValue([]);
    setWstValue([]);
  };
  //옵션데이터
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);
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

  //////////// 핸들러
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
  ///////////////////////////

  /////////////드롭다운
  const [isOpenWmt, setIsOpenWmt] = useState(false);
  const [isOpenWst, setIsOpenWst] = useState(false);

  // 팝업 여부 state
  const [popUp, setPopUp] = useState({
    wmtPopup: false,
    wstPopup: false,
  });

  const handlePopup = (e) => {
    setPopUp({ [e.target.id]: !popUp[e.target.id] });
  };

  const ref = useRef();

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

  const DropdownWst = () => {
    setIsOpenWst(!isOpenWst);
    setIsOpenWmt(false);
  };

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
  ///////////////////

  return (
    <div className="popupcart-wrapper">
      <button className="popupcart-close" onClick={() => setPopupState(false)}>
        x
      </button>
      <div className="popup-image">
        <img
          src={`http://localhost:8090/product/photo/${wihData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "300px" }}
        />
      </div>
      <h2 className="popupcart-productname">{wihData.productName}</h2>
      <h2 className="popupcart-productname">{wihData.productPrice}</h2>
      <div className="sdrOption">
        <div className="dropdown" ref={ref}>
          <div id="wmtPopup" className="dropdown-header" onClick={handlePopup}>
            메인토핑 (다중 선택 가능)
          </div>
          {popUp.wmtPopup && (
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
          <div id="wstPopup" className="dropdown-header" onClick={handlePopup}>
            서브 토핑 (다중 선택 가능)
          </div>
          {popUp.wstPopup && (
            <ul className="checkbox-list">
              {wstData.map(({ productCode, productName, productPrice }) => (
                <li key={`wst-${productCode}`}>
                  <label>
                    <input
                      type="checkbox"
                      name={productName}
                      checked={check[productCode] || false}
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
        <div>
          <Count count={count} setCount={handleCountChange} />
          <span>
            <button
              onClick={(handleBtnClick) => {
                const hasCheckedOption = Object.values(check).some(
                  (isChecked) => isChecked
                );
                if (hasCheckedOption || Object.keys(added).length !== 0) {
                  // alert(JSON.stringify(added));
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
                <p>상 품 명: {added[i].productName}</p>
                <p>메인 토핑: {added[i].wmtValue}</p>
                <p>서브 토핑: {added[i].wstValue}</p>
                <p>수 량: {added[i].counting}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wihpopup;
