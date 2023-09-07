import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CheckPassword from "./checkPassword";
import MyInfo from "./myInfo";
import MyOrder from "./myOrder";
import MyShipment from "./myShipment";
import MyShipmentAdd from "./myShipmentAdd";
import MyShipmentUpdate from "./myShipmentUpdate";
import MyFavorite from "./myFavorite";

const MyPageContentAreaRoutes = () => {
  const auth = useSelector((state) => state.authindex);

  return (
    <div>
      <Routes>
        <Route
          path="/myorder"
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
          path="/myinfo"
          element={
            sessionStorage.getItem("passwordCheck") ? (
              <MyInfo />
            ) : (
              <CheckPassword />
            )
          }
        />
        <Route
          path="/myshipment"
          element={
            auth.isLogined ? <MyShipment /> : <Navigate to={"/member/login"} />
          }
        />
        <Route
          path="/myshipment/add"
          element={
            auth.isLogined ? (
              <MyShipmentAdd />
            ) : (
              <Navigate to={"/member/login"} />
            )
          }
        />
        <Route
          path="/myshipment/update"
          element={
            auth.isLogined ? (
              <MyShipmentUpdate />
            ) : (
              <Navigate to={"/member/login"} />
            )
          }
        />
        <Route
          path="/myfavorite"
          element={
            auth.isLogined ? <MyFavorite /> : <Navigate to={"/member/login"} />
          }
        />
      </Routes>
    </div>
  );
};

export default MyPageContentAreaRoutes;
