import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setResentView } from "../../../basepage/resentViewSlice";
import Bevdetail from "../detail/bevdetail";
import Cupdetail from "../detail/cupdetail";
import Saldetail from "../detail/saldetail";
import Wihdetail from "../detail/wihdetail";
import "../styles/thumbnail.css";
import Salpopup from "../popup/salpopup";
import Cuppopup from "../popup/cuppopup";
import Wihpopup from "../popup/wihpopup";
import Bevpopup from "../popup/bevpopup";
import { addMenuData, resetMenuData } from "./addmenuslice";
const Thumbnail = ({ productData }) => {
  // redux에 등록한 slice 편집을 위한 DisPatch
  const myDispatch = useDispatch();
  // redux에 등록한 state를 사용하기 위한 selector
  const resentView = useSelector((state) => state.rsntView);
  const [popupState, setPopupState] = useState(false);
  const [selectedData, setSelectedData] = useState();

  // 장바구니 초기화용 dispatch
  const dispatch = useDispatch((state) => state.menu);

  const goToCart = (product) => {
    dispatch(resetMenuData()); // 장바구니 초기화
    setSelectedData(product); // 선택된 데이터 설정
    setPopupState(true);
  };

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

  return (
    <div className="product-thumbnail-wrapper">
      <div className="product-thumbnail-grid">
        {productData.map((product) => (
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
                src={`http://localhost:8090/product/photo/${product.productPhoto}`}
                alt="상품 이미지"
                style={{ width: "300px", height: "300px" }}
                onClick={() => {
                  handleImageClick(product);
                }}
              />
            </Link>
            <h3 style={{ textAlign: "center" }}>{product.productName}</h3>
            <div className="product-thumbnail-detail">
              <p>{product.productPrice}원</p>
              <button>찜</button>
              <button onClick={() => goToCart(product)}>장바구니</button>
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
  );
};

export default Thumbnail;
