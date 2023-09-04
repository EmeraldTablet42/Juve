import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../basepage/footer";
import Header from "../basepage/header";
import MenuNavi from "../basepage/menuNavi";
import Sidemeue from "../basepage/sideMenu";
import { setAuth } from "../contentPage/member/authSlice";
import "./index.css";
import PageContentAreaRoutes from "./pageContentAreaRoutes";
import TokenRefresher from "./tokenRefresher";
import CodeToNameConverter from "../contentPage/product/codeToNameConverter";
import CartComplete from "../contentPage/categorypage/cart/cartComplete";

const Index = () => {
  const myDispatch = useDispatch();
  const popUp = useSelector((state) => state.popUp);
  // <TokenRefresher />;

  useEffect(() => {
    const checkIsLogined = async () => {
      try {
        const checkRes = await axios.get(
          `http://localhost:8090/member.get.loginedMember?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        );
        if (checkRes.data.id) {
          myDispatch(setAuth({ isLogined: true, memberId: checkRes.data.id }));
        } else {
          myDispatch(setAuth({ isLogined: false, memberId: "" }));
        }
      } catch (error) {
        alert(error + "(2)");
        alert("DB통신에 에러가 발생했습니다. 잠시후 다시 시도해주세요.(2)");
        window.location.replace("/");
      }
    };
    checkIsLogined();
  }, [myDispatch]);

  return (
    <>
    {popUp.cartComplete && <CartComplete />}
    <CodeToNameConverter />;
      <div className="sideMenu">
        <Sidemeue />
      </div>
      <div className="pageHeaderArea">
          <Header />
      </div>
      <div className="pageMenuNaviArea">
        <MenuNavi />
      </div>
      <div className="pageContentArea" style={{border:"none"}}>
            <PageContentAreaRoutes />
      </div>
      <div className="pageFooterArea">
        <Footer />
        {/* <SessionSucceeding/> */}
      </div>
    </>
  );
};

export default Index;
