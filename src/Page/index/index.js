import React from "react";
import SideMenu from "../SideMenu/sideMenu";
import Footer from "../footer/footer";
import Header from "../header/header";
import MenuNavi from "../menuNavi/menuNavi";
import "./index.css";
import PageContentAreaRoutes from "./pageContentAreaRoutes";

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
          <PageContentAreaRoutes/>
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
