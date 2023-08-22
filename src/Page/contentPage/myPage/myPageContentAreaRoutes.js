import React from "react";
import { Route, Routes } from "react-router-dom";
import MyOrder from "./myOrder";

const MyPageContentAreaRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/order" element={<MyOrder />}></Route>
      </Routes>
    </div>
  );
};

export default MyPageContentAreaRoutes;
