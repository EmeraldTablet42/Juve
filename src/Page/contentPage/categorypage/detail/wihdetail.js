import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCart } from "../components/cartSlice";
import Count from "../components/count";
import Movescroll from "../components/movescroll";
import sampleImage from "../static/sand.png";
import "../styles/detail.css";
import "../styles/scrollcss.css";
import popUpSlice, { setPopUpSlice } from "../../../system/popUpSlice";
import Review from "../components/review";
const Wihdetail = () => {
  const [wihData, setWihData] = useState([]);
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);
  const [count, setCount] = useState(1);
  const addMenuDataSel = useSelector((state) => state.menu);

  const cTn = useSelector((state) => state.codeToName).productCodeToName;
  const navi = useNavigate();
  //redux
  const dispatch = useDispatch();

  const [isOpenWmt, setIsOpenWmt] = useState(false);
  const [isOpenWst, setIsOpenWst] = useState(false);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  const ref = useRef(null);

  const [check, setCheck] = useState({});

  const [wmtValue, setWmtValue] = useState([]);
  const [wstValue, setWstValue] = useState([]);
  const [totalPrice, setTotalPrice] = useState(wihData.productPrice);

  const [added, setAdded] = useState([]);

  const addMenu = () => {
    const existingIndex = added.findIndex((item) => {
      // 날짜를 제외한 모든 옵션을 비교
      return (
        item.productCode === wihData.productCode &&
        JSON.stringify(item.wmtValue) === JSON.stringify(wmtValue) &&
        JSON.stringify(item.wstValue) === JSON.stringify(wstValue)
      );
    });

    if (existingIndex !== -1) {
      // 같은 옵션이 이미 있는 경우 수량만 증가
      const updatedAdded = added.slice();
      updatedAdded[existingIndex].count += count;
      updatedAdded[existingIndex].price =
        updatedAdded[existingIndex].count * totalPrice; // 총 가격 업데이트
      setAdded(updatedAdded);
    } else {
      // 같은 옵션이 없는 경우 새로운 아이템 추가
      setAdded([
        ...added,
        {
          productCode: wihData.productCode,
          wmtValue: wmtValue,
          wstValue: wstValue,
          count: count,
          price: totalPrice * count,
          date: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
        },
      ]);
    }
    initialize();
  };

  const initialize = () => {
    setCheck({});
    setWmtValue([]);
    setWstValue([]);
    setCount(1);
    setTotalPrice(wihData.productPrice);
  };

  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setWihData(res.data);
        setTotalPrice(res.data.productPrice);
      });
  }, [searchParam]);

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

  ///// 핸들러
  const handleWmtChange = (e) => {
    const price = parseInt(e.target.dataset.price, 10); // 문자열을 숫자로 변환
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setWmtValue((prevWmtValue) => [...prevWmtValue, e.target.value]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price); // 가격 더하기
    } else {
      setWmtValue((prevWmtValue) =>
        prevWmtValue.filter((value) => value !== e.target.value)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price); // 가격 빼기
    }
  };

  const handleWstChange = (e) => {
    const price = parseInt(e.target.dataset.price, 10); // 문자열을 숫자로 변환
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setWstValue((prevWstValue) => [...prevWstValue, e.target.value]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price); // 가격 더하기
    } else {
      setWstValue((prevWstValue) =>
        prevWstValue.filter((value) => value !== e.target.value)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price); // 가격 빼기
    }
  };

  ///// 메뉴 추가된거 개별 삭제
  const handleRemoveItem = (index) => {
    const updatedAdded = added.slice(); // 배열 복사
    updatedAdded.splice(index, 1); // 인덱스에 해당하는 요소 제거
    setAdded(updatedAdded); // 업데이트된 배열로 상태 업데이트
  };

  const auth = useSelector((state) => state.authindex);
  const goCart = (e) => {
    if (added.length === 0) {
      alert("메뉴를 추가해주세요.");
      return null;
    }
    regCartDB();
  };

  const regCartDB = () => {
    // alert(JSON.stringify(added));
    axios
      .post("http://localhost:8090/order/reg.cart", added, {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        // alert(res.data);
        if (!auth.isLogined) {
          dispatch(setCart(added));
        }
        dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: true }));
      })
      .catch(() => {
        navi("/");
      });
  };

  const DropdownWmt = () => {
    setIsOpenWmt(!isOpenWmt);
    setIsOpenWst(false);
  };
  const DropdownWst = () => {
    setIsOpenWst(!isOpenWst);
    setIsOpenWmt(false);
  };

  const productTabs = {
    0: Movescroll("상품 상세"),
    1: Movescroll("리뷰"),
    2: Movescroll("상품 문의"),
    length: 3,
  };
  return (
    <div className="detail-wrapper">
      <div className="detail-high">
        <div className="detail-image">
          <img
            className="image-hover"
            src={`http://localhost:8090/product/photo/${wihData.productPhoto}`}
            alt="상품 이미지"
          />
        </div>
        <div className="product-view">
          <div className="product-data">
            <p>상 품 : {wihData.productName} </p>
            <p>가 격 : {wihData.productPrice} </p>
            <div className="sdrOption">
              <div className="dropdown" ref={ref}>
                <div className="dropdown-main" onClick={DropdownWmt}>
                  메인토핑 (복수선택)
                </div>
                {isOpenWmt && (
                  <ul className="checkbox-list">
                    {wmtData.map(
                      ({ productCode, productName, productPrice }) => (
                        <li key={`wmt-${productCode}`}>
                          <label>
                            <input
                              name={productName}
                              checked={check[productCode] || false}
                              type="checkbox"
                              value={productCode}
                              data-price={productPrice}
                              onChange={handleWmtChange}
                            />
                            {productName} + {` (+${productPrice})`}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                )}
                <div className="dropdown-sub" onClick={DropdownWst}>
                  서브토핑 (복수선택)
                </div>
                {isOpenWst && (
                  <ul className="checkbox-list">
                    {wstData.map(
                      ({ productCode, productName, productPrice }) => (
                        <li key={`wst-${productCode}`}>
                          <label>
                            <input
                              name={productName}
                              checked={check[productCode] || false}
                              type="checkbox"
                              value={productCode}
                              data-price={productPrice}
                              onChange={handleWstChange}
                            />
                            {productName} + {` (+${productPrice})`}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                )}
                <Count count={count} setCount={handleCountChange} />
              </div>
            </div>

            <div className="menu-view">
              {
                <div className="menu-item">
                  {wihData.productName}
                  {wmtValue.length !== 0 && (
                    <>
                      <br />
                      메인토핑 : {wmtValue.map((code) => cTn[code]).join(", ")}
                    </>
                  )}
                  {wstValue.length !== 0 && (
                    <>
                      <br />
                      서브토핑 : {wstValue.map((code) => cTn[code]).join(", ")}
                    </>
                  )}
                  <br />
                  수량 : {count}
                  <br />총 가격 : {totalPrice * count}
                </div>
              }
              <div
                style={{
                  display: "block",
                  textAlign: "left",
                }}
                className="addedMenus"
              >
                {added.map((v, i) => (
                  <div className="menu-item" key={i}>
                    {/* {JSON.stringify(v)} */}
                    {cTn[v.productCode]}
                    <br />
                    {`메인토핑 :${v.wmtValue
                      .map((code) => cTn[code])
                      .join(", ")}`}
                    <br />
                    {`서브토핑 :${v.wstValue
                      .map((code) => cTn[code])
                      .join(", ")}`}
                    <br />
                    {`수량 :${v.count}`}
                    <br />
                    {`총가격 :${v.price}`}
                    <br />
                    <div>
                      <button
                        onClick={() => handleRemoveItem(i)}
                        style={{ width: "20px", height: "20px" }}
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button onClick={addMenu}>메뉴담기</button>
              <button
                onClick={() => {
                  const hasCheckedOption = Object.values(check).some(
                    (isChecked) => isChecked
                  );
                  if (hasCheckedOption || Object.keys(added).length !== 0) {
                    dispatch(setCart(added));
                    navi("/purchase");
                  } else {
                    alert("옵션을 선택하세요");
                  }
                }}
              >
                구매예약
              </button>
              <button onClick={goCart}>장바구니에 담기</button>
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
          <h1 style={{ display: "none" }}>리뷰</h1>
        </div>
        <div>
          <Review />
        </div>
        <div ref={productTabs[2].element}>
          <h1>상품 문의</h1>
        </div>
      </div>
    </div>
  );
};

export default Wihdetail;
