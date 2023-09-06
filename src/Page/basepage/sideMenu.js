import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/sidemenu.css";
import Top from "../system/top";
import { setResentView } from "./resentViewSlice";
import { Link } from "react-router-dom";
import sampleimage from "../imagefile/carticon.png";
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
  const cart = useSelector((state) => state.cart);
  const resentView = useSelector((state) => state.rsntView);
  return (
    <div className="sidmenu">
      <div className="sidemenu-object">
        <div>
          <button>주문조회</button>
        </div>
        <div className="sidmenu-cart">
          <button>
            <Link to="/cart">
              <img
                src={sampleimage}
                alt="장바구니"
                style={{ width: "70px", height: "70px" }}
              />
            </Link>
          </button>
        </div>
        <div className="recently-product">
          <p>최근 본 상품</p>
          <div className="resently-images">
            {resentView.resentViewCodeUp && (
              <div className="recently-image">
                <Link to={`/saldetail?id=${resentView.resentViewCodeUp}`}>
                  <img
                    src={`http://localhost:8090/product/photo/${resentView.resentViewImgUp}`}
                    alt="최근본상품1"
                    style={{ width: "70px", height: "70px" }}
                  ></img>
                </Link>
              </div>
            )}
            {resentView.resentViewCodeDown && (
              <div className="recently-image">
                <Link to={`/saldetail?id=${resentView.resentViewCodeDown}`}>
                  <img
                    src={`http://localhost:8090/product/photo/${resentView.resentViewImgDown}`}
                    alt="최근본상품2"
                    onClick={changeResentView}
                    style={{ width: "70px", height: "70px" }}
                  ></img>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="sidemenu-top">
          <Top />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
