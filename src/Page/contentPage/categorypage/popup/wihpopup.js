import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../components/cartSlice';
import Count from '../components/count';
import '../styles/popupcart.css';
import popUpSlice, { setPopUpSlice } from '../../../system/popUpSlice';
import Background from '../../../system/background';
const Wihpopup = (props) => {
  const { productId, setPopupState, wihData = {} } = props;
  const [count, setCount] = useState(1);
  const addMenuDataSel = useSelector((state) => state.menu);
  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  /// 팝업 열릴때 스크롤 금지
  useEffect(() => {
    // 팝업이 열릴 때 스크롤 금지
    document.body.style.overflow = 'hidden';

    // 컴포넌트가 언마운트될 때 스크롤 허용
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

  const [added, setAdded] = useState([]);
  const [wmtValue, setWmtValue] = useState([]);
  const [wstValue, setWstValue] = useState([]);
  const [totalPrice, setTotalPrice] = useState(wihData.productPrice);

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
          date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
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

  //옵션데이터
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8090/product.get').then((res) => {
      const allProduct = res.data.products;
      const wmtFilterData = allProduct.filter(
        (product) => product.category === 'WMT'
      );
      setWmtData(wmtFilterData);
      const wstFilterData = allProduct.filter(
        (product) => product.category === 'WST'
      );
      setWstData(wstFilterData);
    });
  }, []);

  //////////// 핸들러
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
  ///////////////////////////

  ///// 메뉴 추가된거 개별 삭제
  const handleRemoveItem = (index) => {
    const updatedAdded = added.slice(); // 배열 복사
    updatedAdded.splice(index, 1); // 인덱스에 해당하는 요소 제거
    setAdded(updatedAdded); // 업데이트된 배열로 상태 업데이트
  };

  const auth = useSelector((state) => state.authindex);
  const goCart = (e) => {
    if (added.length === 0) {
      alert('메뉴를 추가해주세요.');
      return null;
    }
    regCartDB();
  };

  const goOrder = () => {
    if (added.length === 0) {
      alert('메뉴를 추가해주세요.');
      return null;
    }
    axios
      .post('http://localhost:8090/order/reg.cart', added, {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('loginToken'),
        },
      })
      .then((res) => {
        // alert(res.data);
        if (!auth.isLogined) {
          dispatch(setCart(added));
        }
        navi('/purchase');
      })
      .catch(() => {
        alert('DB통신에러. 잠시 후 다시 시도해주세요.');
        navi('/');
      });
  };

  const regCartDB = () => {
    // alert(JSON.stringify(added));
    axios
      .post('http://localhost:8090/order/reg.cart', added, {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('loginToken'),
        },
      })
      .then((res) => {
        // alert(res.data);
        if (!auth.isLogined) {
          dispatch(setCart(added));
        }
        setPopupState(false);
        dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: true }));
      })
      .catch(() => {
        navi('/');
      });
  };

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
      window.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpenWmt]);

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenWst(!isOpenWst);
      }
    };
    if (isOpenWst) {
      window.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpenWst]);
  ///////////////////

  return (
    <>
      <Background />
      <div className="popupcart-wrapper">
        <button
          className="popupcart-close"
          onClick={() => setPopupState(false)}
        >
          x
        </button>
        <div className="popupcart-header">
          <div className="popupcart-image">
            <img
              src={`http://localhost:8090/product/photo/${wihData.productPhoto}`}
              alt="상품 이미지"
              style={{ width: '300px' }}
            />
          </div>
          <div className="popupcart-option-wrapper">
            <div className="popupcart-list">
              <div className="popupcart-text">
                <h2 className="popupcart-productname">{wihData.productName}</h2>
                <h2 className="popupcart-productname">
                  {wihData.productPrice}
                </h2>
              </div>
              <div className="popupcart-info-wrapper">
                <div className="sdrOption">
                  <div className="dropdown" ref={ref}>
                    <div
                      id="wmtPopup"
                      className="dropdown-header"
                      onClick={handlePopup}
                    >
                      메인토핑 (복수선택)
                    </div>
                    {popUp.wmtPopup && (
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
                    <div
                      id="wstPopup"
                      className="dropdown-header"
                      onClick={handlePopup}
                    >
                      서브토핑 (복수선택)
                    </div>
                    {popUp.wstPopup && (
                      <ul className="checkbox-list">
                        {wstData.map(
                          ({ productCode, productName, productPrice }) => (
                            <li key={`wst-${productCode}`}>
                              <label>
                                <input
                                  type="checkbox"
                                  name={productName}
                                  checked={check[productCode] || false}
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
              </div>
            </div>
            <div className="item-box">
              {
                <div className="menu-item">
                  {wihData.productName}
                  {wmtValue.length !== 0 && (
                    <>
                      <br />
                      메인토핑 : {wmtValue.map((code) => cTn[code]).join(', ')}
                    </>
                  )}
                  {wstValue.length !== 0 && (
                    <>
                      <br />
                      서브토핑 : {wstValue.map((code) => cTn[code]).join(', ')}
                    </>
                  )}
                  <br />
                  수량 : {count}
                  <br />총 가격 : {totalPrice * count}
                </div>
              }
            </div>
            <div className="popupcart-addedMenus">
              <div>
                {added.map((v, i) => (
                  <div className="menu-item" key={i}>
                    <div className="added-list">
                      {/* {JSON.stringify(v)} */}
                      {cTn[v.productCode]}
                      <br />
                      {`메인토핑 :${v.wmtValue
                        .map((code) => cTn[code])
                        .join(', ')}`}
                      <br />
                      {`서브토핑 :${v.wstValue
                        .map((code) => cTn[code])
                        .join(', ')}`}
                      <br />
                      {`수량 :${v.count}`}
                      <br />
                      {`총가격 :${v.price}`}
                      <br />
                    </div>
                    <div>
                      <button
                        onClick={() => handleRemoveItem(i)}
                        style={{ width: '20px', height: '20px' }}
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="purchase-btn">
          <div className="added-btn">
            <button
              className="reverse-button"
              onClick={addMenu}
              style={{ width: '90%', height: '50px' }}
            >
              메뉴 담기
            </button>
          </div>
          <div className="go-to-purchase">
            <div>
              <button className="default-button" onClick={goOrder}>
                구매예약
              </button>
            </div>
            <div>
              <button className="default-button" onClick={goCart}>
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wihpopup;
