import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MyInfo from "./myInfo";
import MyOrder from "./myOrder";
import CheckPassword from "./checkPassword";
import Resign from "./resign";
import MyShipment from "./myShipment";

const MyPageContentAreaRoutes = () => {
  const auth = useSelector((state) => state.authindex);

  return (
    <div>
      <Routes>
        <Route
          path="/myOrder"
          element={
            auth.isLogined ? <MyOrder /> : <Navigate to={"/member/login"} />
          }
        />
        {/* <Route
          path="/myInfo"
          element={
            auth.isLogined ? (
              sessionStorage.getItem("passwordCheck") ? (
                <MyInfo />
              ) : (
                <CheckPassword />
              )
            ) : (
              <Navigate to={"/member/login"} />
            )
          }
        /> */}
        <Route
          path="/myInfo"
          element={
            sessionStorage.getItem("passwordCheck") ? (
              <MyInfo />
            ) : (
              <CheckPassword />
            )
          }
        />
        <Route
          path="/myShipment"
          element={
            auth.isLogined ? <MyShipment /> : <Navigate to={"/member/login"} />
          }
        />
      </Routes>
    </div>
  );
};

export default MyPageContentAreaRoutes;
