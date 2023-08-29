import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MyInfo from "./myInfo";
import MyOrder from "./myOrder";

const MyPageContentAreaRoutes = () => {
  const auth = useSelector((state) => state.authindex);

  return (
    <div>
      <Routes>
        <Route
          path="/order"
          element={
            auth.isLogined ? <MyOrder /> : <Navigate to={"/member/login"} />
          }
        />
       
       {/* <Route
          path="/order"
          element=<PrivateRoute
            component={<MyOrder />}
            authenticated={auth.isLogined}
          />/> */}

        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
    </div>
  );
};

export default MyPageContentAreaRoutes;
