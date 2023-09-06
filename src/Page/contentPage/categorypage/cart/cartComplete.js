import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Background from "../../../system/background";
import popUpSlice, { setPopUpSlice } from "../../../system/popUpSlice";
import { useNavigate } from "react-router-dom";
import sampleimage from "../../../imagefile/carticon.png";
const CartComplete = ({ popUp, setPopUp }) => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    // 팝업이 열릴 때 스크롤 금지
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 스크롤 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closePopup = () => {
    dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: false }));
  };

  const goCart = () => {
    dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: false }));
    navi("/cart");
  };
  return (
    <>
      <Background />
      <div className="cartCompletePopup">
        <div className="cartComplete-head">장바구니 담기</div>
        <div className="cartComplete-image">
          <img
            src={sampleimage}
            alt="장바구니"
            style={{ width: "70", height: "70px" }}
          />
        </div>

        <div className="cartComplete-check">
          <div>상품이 장바구니에 담겼습니다.</div>
          <div>
            <h5>장바구니를 확인하시겠습니까?</h5>
          </div>
        </div>
        <div className="cartComplete-button">
          <div className="close">
            <button onClick={closePopup}>쇼핑계속하기</button>
          </div>
          <div className="move">
            <button onClick={goCart}>장바구니 이동</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComplete;
