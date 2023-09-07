import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Background from '../../../system/background';
import popUpSlice, { setPopUpSlice } from '../../../system/popUpSlice';
import { setCart } from '../components/cartSlice';
import Count from '../components/count';
import '../styles/popupcart.css';

const Salpopup = (props) => {
  /// 팝업 열릴때 스크롤 금지
  useEffect(() => {
    // 팝업이 열릴 때 스크롤 금지
    document.body.style.overflow = 'hidden';

    // 컴포넌트가 언마운트될 때 스크롤 허용
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { setPopupState, salData = {} } = props;
  const [count, setCount] = useState(1);
  const addMenuDataSel = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.authindex);

  const cTn = useSelector((state) => state.codeToName).productCodeToName;
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

  const [sdrValue, setSdrValue] = useState('');
  const [smtValue, setSmtValue] = useState([]);
  const [sstValue, setSstValue] = useState([]);
  const [ssmValue, setSsmValue] = useState([]);
  const [totalPrice, setTotalPrice] = useState(salData.productPrice);

  const [added, setAdded] = useState([]);

  const addMenu = () => {
    if (sdrValue === '') {
      alert('샐러드 드레싱을 선택해주세요');
      return;
    }
    const existingIndex = added.findIndex((item) => {
      // 날짜를 제외한 모든 옵션을 비교
      return (
        item.productCode === salData.productCode &&
        item.sdrValue === sdrValue &&
        JSON.stringify(item.smtValue) === JSON.stringify(smtValue) &&
        JSON.stringify(item.sstValue) === JSON.stringify(sstValue) &&
        JSON.stringify(item.ssmValue) === JSON.stringify(ssmValue)
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
          productCode: salData.productCode,
          sdrValue: sdrValue,
          smtValue: smtValue,
          sstValue: sstValue,
          ssmValue: ssmValue,
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
    setSdrValue('');
    setSmtValue([]);
    setSstValue([]);
    setSsmValue([]);
    setCount(1);
    setTotalPrice(salData.productPrice);
  };

  //옵션데이터
  const [sdrData, setSdrData] = useState([]);
  const [smtData, setSmtData] = useState([]);
  const [sstData, setSstData] = useState([]);
  const [ssmData, setSsmData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8090/product.get').then((res) => {
      const allProduct = res.data.products;
      const sdFilterData = allProduct.filter(
        (product) => product.category === 'SDR'
      );
      setSdrData(sdFilterData);
      const smFilterData = allProduct.filter(
        (product) => product.category === 'SMT'
      );
      setSmtData(smFilterData);
      const sstFilterData = allProduct.filter(
        (product) => product.category === 'SST'
      );
      setSstData(sstFilterData);
      const ssmFilterData = allProduct.filter(
        (product) => product.category === 'SSM'
      );
      setSsmData(ssmFilterData);
    });
  }, []);

  //////////// 핸들러
  const handleSmtChange = (e) => {
    if (sdrValue === '') {
      alert('샐러드 드레싱을 선택해주세요');
      return;
    }
    const price = parseInt(e.target.dataset.price, 10); // 문자열을 숫자로 변환
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSmtValue((prevSmtValue) => [...prevSmtValue, e.target.value]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price); // 가격 더하기
    } else {
      setSmtValue((prevSmtValue) =>
        prevSmtValue.filter((value) => value !== e.target.value)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price); // 가격 더하기
    }
  };

  const handleSstChange = (e) => {
    if (sdrValue === '') {
      alert('샐러드 드레싱을 선택해주세요');
      return;
    }
    const price = parseInt(e.target.dataset.price, 10); // 문자열을 숫자로 변환
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSstValue((prevSstValue) => [...prevSstValue, e.target.value]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price); // 가격 더하기
    } else {
      setSstValue((prevSstValue) =>
        prevSstValue.filter((value) => value !== e.target.value)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price); // 가격 빼기
    }
  };

  const handleSsmChange = (e) => {
    if (sdrValue === '') {
      alert('샐러드 드레싱을 선택해주세요');
      return;
    }
    const price = parseInt(e.target.dataset.price, 10); // 문자열을 숫자로 변환
    setCheck({ ...check, [e.target.value]: e.target.checked });
    if (e.target.checked) {
      setSsmValue((prevSsmValue) => [...prevSsmValue, e.target.value]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price); // 가격 더하기
    } else {
      setSsmValue((prevSsmValue) =>
        prevSsmValue.filter((value) => value !== e.target.value)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price); // 가격 더하기
    }
  };

  const handleSdrChange = (e) => {
    setSdrValue(e.target.value);
  };
  ///////////////////////////

  const handleRemoveItem = (index) => {
    const updatedAdded = added.slice(); // 배열 복사
    updatedAdded.splice(index, 1); // 인덱스에 해당하는 요소 제거
    setAdded(updatedAdded); // 업데이트된 배열로 상태 업데이트
  };

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
        alert('DB통신에러. 잠시 후 다시 시도해주세요.');
        navi('/');
      });
  };

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
      window.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpenSmt]);

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenSst(!isOpenSst);
      }
    };
    if (isOpenSst) {
      window.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpenSst]);

  useEffect(() => {
    const onClick = (e) => {
      if ((ref.current !== null) & !ref.current.contains(e.target)) {
        setIsOpenSsm(!isOpenSsm);
      }
    };
    if (isOpenSsm) {
      window.addEventListener('click', onClick);
    }
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpenSsm]);

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
              src={`http://localhost:8090/product/photo/${salData.productPhoto}`}
              alt="상품 이미지"
              style={{ width: '300px' }}
            />
          </div>
          <div className="popupcart-option-wrapper">
            <div className="popupcart-list">
              <div className="popupcart-text">
                <h2 className="popupcart-productname">{salData.productName}</h2>
                <h2 className="popupcart-productname">
                  {salData.productPrice}
                </h2>
              </div>
              <div className="popupcart-info-wrapper">
                <div className="sdrOption">
                  <select
                    className="selectsize"
                    value={sdrValue}
                    onChange={(e) => {
                      handleSdrChange(e);
                    }}
                  >
                    <option value="" hidden>
                      샐러드 드레싱을 선택하세요
                    </option>
                    {sdrData.map(
                      ({ productCode, productName, productPrice }) => (
                        <option
                          key={`sdr-${productCode}`}
                          value={productCode}
                          data-price={productPrice}
                        >
                          {productName}
                        </option>
                      )
                    )}
                  </select>
                  <div className="dropdown" ref={ref}>
                    <div
                      id="smtPopup"
                      className="dropdown-header"
                      onClick={handlePopup}
                    >
                      메인토핑 (복수선택)
                    </div>
                    {/* {isOpenSmt && ( */}
                    {popUp.smtPopup && (
                      <ul className="checkbox-list">
                        {smtData.map(
                          ({ productCode, productName, productPrice }) => (
                            <li key={`smt-${productCode}`}>
                              <label>
                                <input
                                  name={productName}
                                  checked={check[productCode] || false}
                                  type="checkbox"
                                  value={productCode}
                                  data-price={productPrice}
                                  onChange={handleSmtChange}
                                />
                                {productName} + {` (+${productPrice})`}
                              </label>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                    <div
                      id="sstPopup"
                      className="dropdown-header"
                      onClick={handlePopup}
                    >
                      서브토핑 (복수선택)
                    </div>
                    {/* {isOpenSst && ( */}
                    {popUp.sstPopup && (
                      <ul className="checkbox-list">
                        {sstData.map(
                          ({ productCode, productName, productPrice }) => (
                            <li key={`sst-${productCode}`}>
                              <label>
                                <input
                                  type="checkbox"
                                  name={productName}
                                  checked={check[productCode] || false}
                                  value={productCode}
                                  data-price={productPrice}
                                  onChange={handleSstChange}
                                />
                                {productName} + {` (+${productPrice})`}
                              </label>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                    <div
                      id="ssmPopup"
                      className="dropdown-header"
                      // onClick={DropdownSsm}
                      onClick={handlePopup}
                    >
                      보조메뉴 (복수선택)
                    </div>
                    {/* {isOpenSsm && ( */}
                    {popUp.ssmPopup && (
                      <ul className="checkbox-list">
                        {ssmData.map(
                          ({ productCode, productName, productPrice }) => (
                            <li key={`ssm-${productCode}`}>
                              <label>
                                <input
                                  type="checkbox"
                                  name={productName}
                                  checked={check[productCode] || false}
                                  value={productCode}
                                  data-price={productPrice}
                                  onChange={handleSsmChange}
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
              {sdrValue && (
                <div className="menu-item-view">
                  {salData.productName}
                  {sdrValue && (
                    <>
                      <br />
                      드레싱 : {cTn[sdrValue]}
                    </>
                  )}
                  {smtValue.length !== 0 && (
                    <>
                      <br />
                      메인토핑 : {smtValue.map((code) => cTn[code]).join(', ')}
                    </>
                  )}
                  {sstValue.length !== 0 && (
                    <>
                      <br />
                      서브토핑 : {sstValue.map((code) => cTn[code]).join(', ')}
                    </>
                  )}
                  {ssmValue.length !== 0 && (
                    <>
                      <br />
                      보조메뉴 : {ssmValue.map((code) => cTn[code]).join(', ')}
                    </>
                  )}
                  <br />
                  수량 : {count}
                  <br />총 가격 : {totalPrice * count}
                </div>
              )}
            </div>
            <div className="popupcart-addedMenus">
              {added.map((v, i) => (
                <div className="menu-item" key={i}>
                  <div className="menu-product">
                    <div className="menu-list">
                      {/* {JSON.stringify(v)} */}
                      {cTn[v.productCode]}
                      <br />
                      {`드레싱 :${cTn[v.sdrValue]}`}
                      <br />
                      {`메인토핑 :${v.smtValue
                        .map((code) => cTn[code])
                        .join(', ')}`}
                      <br />
                      {`서브토핑 :${v.sstValue
                        .map((code) => cTn[code])
                        .join(', ')}`}
                      <br />
                      {`보조메뉴 :${v.ssmValue
                        .map((code) => cTn[code])
                        .join(', ')}`}
                      <br />
                    </div>
                    <div className="product-price">
                      {`수량 :${v.count}`}
                      <br />
                      {`총가격 :${v.price}`}
                      <br />
                    </div>
                  </div>
                  <div className="delete">
                    <button onClick={() => handleRemoveItem(i)}>x</button>
                  </div>
                </div>
              ))}
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

export default Salpopup;
