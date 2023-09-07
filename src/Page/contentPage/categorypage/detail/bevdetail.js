import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCart } from '../components/cartSlice';
import Count from '../components/count';
import Movescroll from '../components/movescroll';
import sampleImage from '../static/bev.jpg';
import '../styles/scrollcss.css';
import popUpSlice, { setPopUpSlice } from '../../../system/popUpSlice';
import '../styles/detail.css';
import Review from '../components/review';

const Bevdetail = (detailData) => {
  const [bevData, setBevData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(bevData.productPrice);
  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  const navi = useNavigate();

  const dispatch = useDispatch();

  const [added, setAdded] = useState([]);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };

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
        dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: true }));
      })
      .catch(() => {
        navi('/');
      });
  };

  const addMenu = () => {
    const existingIndex = added.findIndex((item) => {
      // 날짜를 제외한 모든 옵션을 비교
      return item.productCode === bevData.productCode;
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
          productCode: bevData.productCode,
          count: count,
          price: totalPrice * count,
          date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        },
      ]);
    }
    initialize();
  };

  const initialize = () => {
    setCount(1);
    setTotalPrice(bevData.productPrice);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get('id')}`)
      .then((res) => {
        setBevData(res.data);
        setTotalPrice(res.data.productPrice);
      });
  }, []);

  const productTabs = {
    0: Movescroll('상품 상세'),
    1: Movescroll('리뷰'),
    2: Movescroll('상품 문의'),
    length: 3,
  };
  return (
    <div className="detail-wrapper">
      <div className="detail-high">
        <div className="detail-image">
          <img
            className="image-hover"
            src={`http://localhost:8090/product/photo/${bevData.productPhoto}`}
            alt="상품 이미지"
          />
        </div>
        <div className="product-view">
          <div className="product-data">
            <div className="product-data-view">
              <div className="product-data-header">
                <div className="product-data-Name">
                  <p>상 품 : {bevData.productName}</p>
                  <p>가 격 : {bevData.productPrice}</p>
                </div>
                <div className="sdrOption">
                  <div className="purchase-count-button">
                    <Count count={count} setCount={handleCountChange} />
                  </div>
                </div>
              </div>
              <div className="item-box">
                {
                  <div className="menu-item">
                    {bevData.productName}
                    <br />
                    수량 : {count}
                    <br />총 가격 : {totalPrice * count}
                  </div>
                }
                <div className="addedMenus">
                  {added.map((v, i) => (
                    <div className="menu-item" key={i}>
                      <div className="added-list">
                        {/* {JSON.stringify(v)} */}
                        {cTn[v.productCode]}
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
                <div className="purchase-btn">
                  <div className="added-btn">
                    <button
                      className="reverse-button"
                      onClick={addMenu}
                      style={{ width: '97%', height: '50px' }}
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
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-buttons">
        {Array.from(Array(productTabs.length).keys()).map((index) => (
          <div
            className="scrollMove"
            style={{ display: 'grid' }}
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
          <h1 style={{ display: 'none' }}>상품상세</h1>
          <img src={sampleImage} style={{ width: '100%' }} alt="상품이미지" />
        </div>

        <div ref={productTabs[1].element}>
          <h1 style={{ display: 'none', height: '50px' }}>리뷰</h1>
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

export default Bevdetail;
