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
<<<<<<< HEAD
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/salad' element={<Salad />} />
            <Route path='/sand' element={<Sand />} />
            <Route path='/juice' element={<Juice />} />
            <Route path='/join' element={<Join />} />
            <Route path='/loginbutton' element={<Loginbutton />} />
          </Routes>
=======
          <PageContentAreaRoutes/>
>>>>>>> 5548d5cd9219bc786cf028fb4bf35cb8e34fc8c5
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
