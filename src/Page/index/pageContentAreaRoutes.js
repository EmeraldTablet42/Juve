import React from "react";
import { Route, Routes } from "react-router-dom";
import Juice from "../contentPage/categorypage/juice";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import HomePage from "../contentPage/homePage/homePage";
import Join from "../contentPage/member/join";
import Login from "../contentPage/member/login";
import { LoginUnsigned } from "../contentPage/member/loginUnsigned";
import Detailmenu from "../contentPage/categorypage/detailmenu";
import MyPage from "../contentPage/myPage/myPage";
import ProductReg from "../contentPage/product/productReg";
import ProductGet from "../contentPage/product/productGet";
import ProductUpdate from "../contentPage/product/productUpdate";
import Fruit from "../contentPage/categorypage/fruit";
const PageContentAreaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salad" element={<Salad />} />
        <Route path="/sand" element={<Sand />} />
        <Route path="/juice" element={<Juice />} />
        <Route path="/fruit" element={<Fruit />} />
        <Route path="/member/join" element={<Join />} />
        <Route path="/member/login" element={<Login />} />
        <Route path="/loginUnsigned" element={<LoginUnsigned />} />
        <Route path="detail" element={<Detailmenu />} />
        <Route path="/member/mypage/*" element={<MyPage />} />
        <Route path="/product/reg" element={<ProductReg />} />
        <Route path="/product/get" element={<ProductGet />} />
        <Route path="/product/update" element={<ProductUpdate />} />
      </Routes>
    </div>
  );
};

export default PageContentAreaRoutes;
