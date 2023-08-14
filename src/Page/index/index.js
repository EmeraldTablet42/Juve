import React from "react";
import SideMenu from "../SideMenu/sideMenu";
import { Login } from "../contentPage/login/login";
import { LoginUnsigned } from "../contentPage/login/loginUnsigned";
import Footer from "../footer/footer";
import Header from "../header/header";
import MenuNavi from "../menuNavi/menuNavi";
import "./index.css";

const Index = () => {
  return (
    <>
      <div id="sideMenu">
        <SideMenu />
      </div>
      <table id="pageHeaderArea">
        <tr>
          <td>
            <Header />
          </td>
        </tr>
      </table>
      <table id="pageMenuNaviArea">
        <MenuNavi/>
      </table>
      <table id="pageContentArea">
        <tr>
          <td align="center">
            {/* <HomePage /> */}
            {/* <Login/> */}
            <LoginUnsigned />
          </td>
        </tr>
      </table>
      <table id="pageFooterArea">
        <Footer />
      </table>
    </>
  );
};

export default Index;
