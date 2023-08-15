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
      <div className="sideMenu">
        <SideMenu />
      </div>
      <table className="pageHeaderArea">
        <tr>
          <td>
            <Header />
          </td>
        </tr>
      </table>
      <table className="pageMenuNaviArea">
        <MenuNavi/>
        
      </table>
      <table className="pageContentArea">
        <tr>
          <td align="center">
          <PageContentAreaRoutes/>
          </td>
        </tr>
      </table>
      <table className="pageFooterArea">
        <Footer />
      </table>
    </>
  );
};

export default Index;
