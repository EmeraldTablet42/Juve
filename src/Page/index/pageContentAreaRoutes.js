import React from "react";
import { Route, Routes } from "react-router-dom";
import Juice from "../contentPage/categorypage/juice";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import HomePage from "../contentPage/homePage/homePage";
import Join from "../contentPage/member/join";
import Login from "../contentPage/member/login";
import { LoginUnsigned } from "../contentPage/member/loginUnsigned";
const PageContentAreaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salad" element={<Salad />} />
        <Route path="/sand" element={<Sand />} />
        <Route path="/juice" element={<Juice />} />
        <Route path="/signin" element={<Join />} />
        <Route path="/member/login" element={<Login />} />
        <Route path="/loginUnsigned" element={<LoginUnsigned />} />
      </Routes>
    </div>
  );
};

export default PageContentAreaRoutes;
