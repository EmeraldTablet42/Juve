import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../basepage/footer";
import Header from "../basepage/header";
import Sidemeue from "../basepage/sideMenu";
import { setAuth } from "../contentPage/member/authSlice";
import "./index.css";
import PageContentAreaRoutes from "./pageContentAreaRoutes";
import TokenRefresher from "./tokenRefresher";
import MenuNavi_Old from "../basepage/menuNavi_Old";
import MenuNavi from "../basepage/menuNavi";

const Index = () => {
  const myDispatch = useDispatch();
  <TokenRefresher />;

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
      <div className="sideMenu">
        <Sidemeue />
      </div>
      <table className="pageHeaderArea">
        <tr>
          <td>
            <Header />
          </td>
        </tr>
      </table>
      <table className="pageMenuNaviArea">
        <MenuNavi />
      </table>
      <table className="pageContentArea">
        <tr>
          <td align="left">
            <PageContentAreaRoutes />
          </td>
        </tr>
      </table>
      <table className="pageFooterArea">
        <Footer />
        {/* <SessionSucceeding/> */}
      </table>
    </>
  );
};

export default Index;
