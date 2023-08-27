import React from "react";
import { Route, Routes } from "react-router-dom";
import MyOrder from "./myOrder";
import MyInfo from "./myInfo";

const MyPageContentAreaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/order" element={<MyOrder />} />
        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
    </div>
  );
};

export default MyPageContentAreaRoutes;
