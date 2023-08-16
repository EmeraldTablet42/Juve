import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "../contentPage/categorypage/join";
import Juice from "../contentPage/categorypage/juice";
import Loginbutton from "../contentPage/categorypage/loginbutton";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import MenuNavi from "../../basepage/menuNavi";
import Header from "../../basepage/header";
import Sidemeue from "../../basepage/sideMenu"
import Footer from "../../basepage/footer"
import "./index.css";
import HomePage from "../contentPage/homePage/homePage";

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
        <MenuNavi/>
        
      </table>
      <table className="pageContentArea">
        <tr>
          <td align="center">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/salad' element={<Salad />} />
            <Route path='/sand' element={<Sand />} />
            <Route path='/juice' element={<Juice />} />
            <Route path='/join' element={<Join />} />
            <Route path='/loginbutton' element={<Loginbutton />} />
          </Routes>
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
