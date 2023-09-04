import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Background from "../../../system/background";
import popUpSlice, { setPopUpSlice } from "../../../system/popUpSlice";
import { useNavigate } from "react-router-dom";

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
      <table border={1} className="cartCompletePopup">
        <tr>
          <th colSpan={3}>장바구니 담기</th>
        </tr>
        <tr>
          <td colSpan={2}>그림</td>
        </tr>
        <tr>
          <td colSpan={2}>상품이 장바구니에 담겼습니다.</td>
        </tr>
        <tr>
          <td colSpan={2}>장바구니를 확인하시겠습니까?</td>
        </tr>
        <tr>
          <td onClick={closePopup}>쇼핑계속하기</td>
          <td onClick={goCart}>확인</td>
        </tr>
      </table>
    </>
  );
};

export default CartComplete;
