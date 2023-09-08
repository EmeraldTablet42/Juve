import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setResentView } from '../../basepage/resentViewSlice';
import Bevdetail from '../categorypage/detail/bevdetail';
import Cupdetail from '../categorypage/detail/cupdetail';
import Saldetail from '../categorypage/detail/saldetail';
import Wihdetail from '../categorypage/detail/wihdetail';
import Salpopup from '../categorypage/popup/salpopup';
import Cuppopup from '../categorypage/popup/cuppopup';
import Wihpopup from '../categorypage/popup/wihpopup';
import Bevpopup from '../categorypage/popup/bevpopup';
import '../categorypage/styles/allmenu.css';
import sampleimage from '../../imagefile/carticon.png';
import { addFavorite, removeFavorite } from '../categorypage/favoriteSlice';

const Allmenu = () => {
  //Data출력
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('http://localhost:8090/product.get').then((res) => {
      setAllData(res.data.products);
    });
  }, []);
  const [filterData, setFilteredData] = useState([]);
  useEffect(() => {
    const include = ['BEV', 'SAL', 'WIH', 'CUP'];
    const filteredProduct = allData.filter((product) =>
      include.includes(product.category)
    );
    setFilteredData(filteredProduct);
  }, [allData]);
  /////////////////////////////
  const auth = useSelector((state) => state.authindex);

  const favorite = useSelector((state) => state.favorite);

  const myDispatch = useDispatch();
  const resentView = useSelector((state) => state.rsntView);
  const [popupState, setPopupState] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const allmenuRef = useRef(null);
  // allmenu의 크기조절
  useEffect(() => {
    // Allmenu 컴포넌트의 높이를 상위 <div>에 적용
    if (allmenuRef.current) {
      const allmenuHeight = allmenuRef.current.clientHeight;
      allmenuRef.current.parentElement.style.height = `${allmenuHeight}px`;
    }
  }, [filterData]);
  /////////
  //장바구니 이동
  const goToCart = (product) => {
    // dispatch(resetMenuData()); // 장바구니 초기화
    setSelectedData(product); // 선택된 데이터 설정
    setPopupState(true);
  };
  /////
  const handleImageClick = (product) => {
    //// 사이드바 최근 본 메뉴 처리하는 로직부분// 병합충돌시 이부분만 handleImageClick 때 넣어주세요!//
    if (product.productCode !== resentView.resentViewCodeUp) {
      myDispatch(
        setResentView({
          resentViewImgUp: product.productPhoto,
          resentViewCodeUp: product.productCode,
          resentViewImgDown: resentView.resentViewImgUp,
          resentViewCodeDown: resentView.resentViewCodeUp,
        })
      );
    }
    setSelectedData(product);
  };
  const addFav = (productCode) => {
    axios
      .get(
        `http://localhost:8090/member.add.favorites?token=${sessionStorage.getItem(
          'loginToken'
        )}&productCode=${productCode}`
      )
      .then(() => {
        // alert("찜성공");
        dispatch(addFavorite(productCode));
      })
      .catch((error) => {
        alert(error);
        alert('DB통신에러. 잠시 후 다시 시도해주세요.');
      });
  };

  const removeFav = (productCode) => {
    // alert(productCode);

    axios
      .get(
        `http://localhost:8090/member.remove.favorite?token=${sessionStorage.getItem(
          'loginToken'
        )}&productCode=${productCode}`
      )
      .then(() => {
        dispatch(removeFavorite(productCode));
      })
      .catch(() => {
        alert('DB통신에러. 잠시 후 다시 시도해주세요');
      });
  };
  return (
    <div className="allmenu-wrapper">
      <div className="allmenu-grid">
        {filterData.map((product) => (
          <div className="allmenu-thumbnail" key={product.productCode}>
            <Link
              to={
                product.category === 'SAL'
                  ? `/saldetail?id=${product.productCode}`
                  : product.category === 'CUP'
                  ? `/cupdetail?id=${product.productCode}`
                  : product.category === 'WIH'
                  ? `/wihdetail?id=${product.productCode}`
                  : product.category === 'BEV'
                  ? `/bevdetail?id=${product.productCode}`
                  : ``
              }
              style={{ display: 'inline-block' }}
            >
              <img
                className="image-hover"
                src={`http://localhost:8090/product/photo/${product.productPhoto}`}
                alt="상품 이미지"
                onClick={() => {
                  handleImageClick(product);
                }}
              />
            </Link>
            <h3 style={{ textAlign: 'center' }}>{product.productName}</h3>
            <div className="allmenu-thumbnail-detail">
              <p>{product.productPrice}원</p>
              <div className="product-detail-btn">
                {auth.isLogined && (
                  <>
                    {favorite.includes(product.productCode) ? (
                      <button
                        style={{
                          backgroundColor: 'red',
                        }}
                        onClick={() => {
                          removeFav(product.productCode);
                        }}
                      >
                        ♡
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addFav(product.productCode);
                        }}
                      >
                        ♡
                      </button>
                    )}
                  </>
                )}
                <button onClick={() => goToCart(product)}>
                  <img
                    src={sampleimage}
                    alt="장바구니"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>
            </div>
            {popupState && (
              <div className="cart-popup-wrapper">
                {product.category === 'SAL' && (
                  <Salpopup
                    salData={selectedData}
                    productId={product.productCode}
                    setPopupState={setPopupState}
                  />
                )}
                {product.category === 'WIH' && (
                  <Wihpopup
                    wihData={selectedData}
                    productId={product.productCode}
                    setPopupState={setPopupState}
                  />
                )}
                {product.category === 'CUP' && (
                  <Cuppopup
                    cupData={selectedData}
                    productId={product.productCode}
                    setPopupState={setPopupState}
                  />
                )}
                {product.category === 'BEV' && (
                  <Bevpopup
                    bevData={selectedData}
                    productId={product.productCode}
                    setPopupState={setPopupState}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        {/* {false && selectedData && <Detailmenu productData={[selectedData]}/> } */}
        {false && <Saldetail detailData={selectedData} />}
        {false && <Bevdetail detailData={selectedData} />}
        {false && <Wihdetail detailData={selectedData} />}
        {false && <Cupdetail detailData={selectedData} />}
      </div>
    </div>
  );
};

export default Allmenu;
