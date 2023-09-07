import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../contentPage/admin/adminPage";
import ConsultGet from "../contentPage/bbs/consult/consultGet";
import ConsultListGet from "../contentPage/bbs/consult/consultListGet";
import ConsultReg from "../contentPage/bbs/consult/consultReg";
import ConsultUpdate from "../contentPage/bbs/consult/consultUpdate";
import NoticeGet from "../contentPage/bbs/notice/noticeGet";
import NoticeListGet from "../contentPage/bbs/notice/noticeListGet";
import NoticeReg from "../contentPage/bbs/notice/noticeReg";
import NoticeUpdate from "../contentPage/bbs/notice/noticeUpdate";
import Cart from "../contentPage/categorypage/cart/cart";
import Test from "../contentPage/categorypage/components/test";
import Bevdetail from "../contentPage/categorypage/detail/bevdetail";
import Cupdetail from "../contentPage/categorypage/detail/cupdetail";
import Saldetail from "../contentPage/categorypage/detail/saldetail";
import Wihdetail from "../contentPage/categorypage/detail/wihdetail";
import Fruit from "../contentPage/categorypage/fruit";
import Juice from "../contentPage/categorypage/juice";
import Salad from "../contentPage/categorypage/salad";
import Sand from "../contentPage/categorypage/sand";
import HomePage from "../contentPage/homePage/homePage";
import Join from "../contentPage/member/join";
import Login from "../contentPage/member/login";
import { LoginUnsigned } from "../contentPage/member/loginUnsigned";
import MyPage from "../contentPage/myPage/myPage";
import Resign from "../contentPage/myPage/resign";
import Purchase from "../contentPage/order/purchase";
import PurchaseCheck from "../contentPage/order/purchasecheck";
import ProductGet from "../contentPage/product/productGet";
import ProductReg from "../contentPage/product/productReg";
import ProductUpdate from "../contentPage/product/productUpdate";
import TokenRefresher from "./tokenRefresher";
const PageContentAreaRoutes = () => {
  const auth = useSelector((state) => state.authindex);
  return (
    <div>
      <TokenRefresher />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/salad" element={<Salad />} />
        <Route path="/sand" element={<Sand />} />
        <Route path="/juice" element={<Juice />} />
        <Route path="/fruit" element={<Fruit />} />
        <Route
          path="/member/join"
          element={!auth.isLogined ? <Join /> : <Navigate to={"/"} />}
        />
        <Route path="/member/login" element={<Login />} />
        <Route path="/loginunsigned" element={<LoginUnsigned />} />
        <Route path="/saldetail" element={<Saldetail />} />
        <Route path="/bevdetail" element={<Bevdetail />} />
        <Route path="/wihdetail" element={<Wihdetail />} />
        <Route path="/cupdetail" element={<Cupdetail />} />
        <Route path="/member/mypage/*" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route
          path="/member/resign"
          element={
            auth.isLogined ? <Resign /> : <Navigate to={"/member/login"} />
          }
        />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchasecheck" element={<PurchaseCheck />} />
        <Route path="/product/reg" element={<ProductReg />} />
        <Route path="/product/get" element={<ProductGet />} />
        <Route path="/product/update" element={<ProductUpdate />} />
        <Route path="/test" element={<Test />} />
        <Route path="/board/notice/list" element={<NoticeListGet />} />
        <Route path="/board/notice/get" element={<NoticeGet />} />
        <Route path="/board/notice/reg" element={<NoticeReg />} />
        <Route path="/board/notice/update" element={<NoticeUpdate />} />
        <Route path="/board/consult/list" element={<ConsultListGet />} />
        <Route path="/board/consult/get" element={<ConsultGet />} />
        <Route path="/board/consult/reg" element={<ConsultReg />} />
        <Route path="/board/consult/update" element={<ConsultUpdate />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin/*"
          element={
            auth.memberId === "adminjuve" ? (
              <AdminPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default PageContentAreaRoutes;
