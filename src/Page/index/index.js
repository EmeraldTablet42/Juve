import React from "react";
import MenuNavi from "../../basepage/menuNavi";
import Header from "../../basepage/header";
import Sidemeue from "../../basepage/sideMenu";
import Footer from "../../basepage/footer";
import "./index.css";
import PageContentAreaRoutes from "./pageContentAreaRoutes";

const Index = () => {
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
      </table>
    </>
  );
};

export default Index;
