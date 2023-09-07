import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminOrder from "./adminOrder";
import ProductGet from "./product/productGet"
import AdminSales from "./adminSales";
import AdminPrice from "./adminPrice";

const AdminAreaRoutes = () => {
  const auth = useSelector((state) => state.authindex);
  return (
    <div>
      <Routes>
        <Route
          path="/order"
          element={
            auth.memberId === "adminjuve" ? (
              <AdminOrder />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/product"
          element={
            auth.memberId === "adminjuve" ? (
                <ProductGet/>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/sales"
          element={
            auth.memberId === "adminjuve" ? (
              <AdminSales />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/price"
          element={
            auth.memberId === "adminjuve" ? (
              <AdminPrice />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AdminAreaRoutes;
