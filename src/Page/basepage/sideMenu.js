import React from "react";
import Top from "../system/top";
import "../css/sidemenu.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SideMenu = () => {
  const resentView = useSelector((state) => state.rsntView);
  return (
    <div className="sidmenu">
      <div className="sidemenu-object">
        <button>주문조회</button>
        <button>장바구니</button>
        <button>최근 본 상품</button>
        {resentView.resentViewCodeUp && (
          <div>
            <a
              href={`/saldetail?id=${resentView.resentViewCodeUp}`}
            >
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
            <a
              href={`/saldetail?id=${resentView.resentViewCodeDown}`}
            >
              <img
                src={`http://localhost:8090/product/photo/${resentView.resentViewImgDown}`}
                alt="최근본상품2"
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
