import React from "react";
import SideMenu from "../SideMenu/sideMenu";
import { Login } from "../contentPage/login/login";
import { LoginUnsigned } from "../contentPage/login/loginUnsigned";
import Footer from "../footer/footer";
import Header from "../header/header";
import MenuNavi from "../menuNavi/menuNavi";
import "./index.css";
import Top from "../system/top";
import { Routes, Route } from "react-router-dom";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import Juice from "../contentPage/categorypage/juice";
import Join from "../contentPage/categorypage/join";
import Loginbutton from "../contentPage/categorypage/loginbutton";

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
        <Routes>
          <Route path='/salad' element={<Salad />} />
          <Route path='/sand' element={<Sand />} />
          <Route path='/juice' element={<Juice />} />
          <Route path='/join' element={<Join />} />
          <Route path='/loginbutton' element={<Loginbutton />} />
        </Routes>
      </table>
      <table id="pageContentArea">
        <tr>
          <td align="center">
          </td>
        </tr>
      </table>
      <table>
        <Top />
      </table>
      <table id="pageFooterArea">
        <Footer />
      </table>
    </>
  );
};

export default Index;
