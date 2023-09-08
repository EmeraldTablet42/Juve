import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { setResentView } from "../../basepage/resentViewSlice";
import sampleimage from "../../imagefile/carticon.png";
import Bevdetail from "../categorypage/detail/bevdetail";
import Cupdetail from "../categorypage/detail/cupdetail";
import Saldetail from "../categorypage/detail/saldetail";
import Wihdetail from "../categorypage/detail/wihdetail";
import { addFavorite, removeFavorite } from "../categorypage/favoriteSlice";
import Bevpopup from "../categorypage/popup/bevpopup";
import Cuppopup from "../categorypage/popup/cuppopup";
import Salpopup from "../categorypage/popup/salpopup";
import Wihpopup from "../categorypage/popup/wihpopup";
import "../categorypage/styles/homepage.css";
import Allmenu from "./allmenu";
import Imageslider from "./imageslider";
const HomePage = () => {
  const searchResultArray = useSelector((state) => state.search);
  const myDispatch = useDispatch();
  const resentView = useSelector((state) => state.rsntView);
  const [popupState, setPopupState] = useState(false);
  const [selectedData, setSelectedData] = useState();

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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    setSelectedData(product);
  };

  // 로그인 확인
  const auth = useSelector((state) => state.authindex);

  const favorite = useSelector((state) => state.favorite);

  const goToCart = (product) => {
    // dispatch(resetMenuData()); // 장바구니 초기화
    setSelectedData(product); // 선택된 데이터 설정
    setPopupState(true);
  };

  const addFav = (productCode) => {
    axios
      .get(
        `http://localhost:8090/member.add.favorites?token=${sessionStorage.getItem(
          "loginToken"
        )}&productCode=${productCode}`
      )
      .then(() => {
        // alert("찜성공");
        myDispatch(addFavorite(productCode));
      })
      .catch((error) => {
        alert(error);
        alert("DB통신에러. 잠시 후 다시 시도해주세요.");
      });
  };

  const removeFav = (productCode) => {
    // alert(productCode);

    axios
      .get(
        `http://localhost:8090/member.remove.favorite?token=${sessionStorage.getItem(
          "loginToken"
        )}&productCode=${productCode}`
      )
      .then(() => {
        myDispatch(removeFavorite(productCode));
      })
      .catch(() => {
        alert("DB통신에러. 잠시 후 다시 시도해주세요");
      });
  };

  return (
    <div className="home">
      <div className="Slider" style={{ margin: "0" }}>
        <Imageslider />
      </div>
      {/* <div className="home-title">
        <h1 style={{ textAlign: 'center' }}>대표메뉴</h1>
      </div> */}
      {/* <hr style={{ margin: '10px 0', border: '1px solid #ccc' }} /> */}
      {/* <div className="bestMenu">
        <div>
          <img
            className="image-hover"
            src={golsal}
            alt="골라담는샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>골라담는 샐러드</p>
        </div>
        <div>
          <img
            className="image-hover"
            src={pastasal}
            alt="파스타 샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>파스타 샐러드</p>
        </div>
        <div>
          <img
            className="image-hover"
            src={hwaisal}
            alt="하와이안 포켓 샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>하와이안 포켓 샐러드</p>
        </div>
      </div> */}
      <hr style={{ margin: "100px 0", border: "1px solid #FAA92830" }} />
      {searchResultArray.length > 0 ? (
        <div className="product-thumbnail-wrapper">
          <div className="product-thumbnail-grid">
            {searchResultArray.map((product) => (
              <div className="product-thumbnail" key={product.productCode}>
                <Link
                  to={
                    product.category === "SAL"
                      ? `/saldetail?id=${product.productCode}`
                      : product.category === "CUP"
                      ? `/cupdetail?id=${product.productCode}`
                      : product.category === "WIH"
                      ? `/wihdetail?id=${product.productCode}`
                      : product.category === "BEV"
                      ? `/bevdetail?id=${product.productCode}`
                      : ``
                  }
                  style={{ display: "inline-block" }}
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
                <h3 style={{ textAlign: "center" }}>{product.productName}</h3>
                <div className="product-thumbnail-detail">
                  <p>{product.productPrice}원</p>
                  <div className="product-detail-btn">
                    {auth.isLogined && (
                      <>
                        {favorite.includes(product.productCode) ? (
                          <button
                            onClick={() => {
                              removeFav(product.productCode);
                            }}
                          >
                            찜해제
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addFav(product.productCode);
                            }}
                          >
                            찜
                          </button>
                        )}
                      </>
                    )}
                    <button onClick={() => goToCart(product)}>
                      <img
                        src={sampleimage}
                        alt="장바구니"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                </div>
                {popupState && (
                  <div className="cart-popup-wrapper">
                    {product.category === "SAL" && (
                      <Salpopup
                        salData={selectedData}
                        productId={product.productCode}
                        setPopupState={setPopupState}
                      />
                    )}
                    {product.category === "WIH" && (
                      <Wihpopup
                        wihData={selectedData}
                        productId={product.productCode}
                        setPopupState={setPopupState}
                      />
                    )}
                    {product.category === "CUP" && (
                      <Cuppopup
                        cupData={selectedData}
                        productId={product.productCode}
                        setPopupState={setPopupState}
                      />
                    )}
                    {product.category === "BEV" && (
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
      ) : (
        <div className="home-allmenu">
          <h1>전체 메뉴 보기</h1>
          <h4>(상품가격은 옵션에 따라 변동 될 수 있습니다)</h4>
          <Allmenu />
        </div>
      )}
    </div>
  );
};

export default HomePage;
