import React, { useEffect, useState } from "react";
import "./styles/menu.css";
import sampleImage from "./static/orange.png";
import Thumbnail from "./components/thumbnail";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "./favoriteSlice";
const Menupage = ({ productData }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authindex);

  useEffect(() => {
    auth.isLogined && getFavorites();
  }, []);

  const getFavorites = () => {
    axios(
      `http://localhost:8090/member.get.favorites?token=${sessionStorage.getItem(
        "loginToken"
      )}`
    ).then((res) => {
      // alert(JSON.stringify(res.data));
      const productCodes = res.data.favorites.map(
        (favorite) => favorite.productCode
      );
      // alert(JSON.stringify(productCodes));
      dispatch(setFavorite(productCodes));
    });
  };

  return (
    <div>
      <body className="menu-page">
        <img src={sampleImage} alt="상품이미지" />
        <div className="menu-grid">
          <Thumbnail productData={productData} />
        </div>
      </body>
    </div>
  );
};

export default Menupage;
