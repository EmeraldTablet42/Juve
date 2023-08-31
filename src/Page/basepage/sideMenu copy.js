import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/sidemenu.css";
import Top from "../system/top";
import { setResentView } from "./resentViewSlice";
const SideMenu = () => {
  const myDispatch = useDispatch();
  //// 사이드바 최근 본 메뉴에서 아래꺼를 누르면 아래것이 위로가고 위에게 아래로 감
  const changeResentView = () => {
    myDispatch(
      setResentView({
        resentViewImgUp: resentView.resentViewImgDown,
        resentViewCodeUp: resentView.resentViewCodeDown,
        resentViewImgDown: resentView.resentViewImgUp,
        resentViewCodeDown: resentView.resentViewCodeUp,
      })
    );
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const resentView = useSelector((state) => state.rsntView);
  return (
    <div className="sidmenu">
      <div className="sidemenu-object">
        <button>주문조회</button>
        <button>장바구니</button>
        <button>최근 본 상품</button>
        {resentView.resentViewCodeUp && (
          <div>
            <a href={`/saldetail?id=${resentView.resentViewCodeUp}`}>
              <img
                src={`http://localhost:8090/product/photo/${resentView.resentViewImgUp}`}
                alt="최근본상품1"
                style={{ maxHeight: "80px" }}
              ></img>
            </a>
          </div>
        )}
        {resentView.resentViewCodeDown && (
          <div>
            <a href={`/saldetail?id=${resentView.resentViewCodeDown}`}>
              <img
                src={`http://localhost:8090/product/photo/${resentView.resentViewImgDown}`}
                alt="최근본상품2"
                onClick={changeResentView}
                style={{ maxHeight: "80px" }}
              ></img>
            </a>
          </div>
        )}
      </div>
      <div className="sidemenu-top">
        <Top />
      </div>
    </div>
  );
};

export default SideMenu;
