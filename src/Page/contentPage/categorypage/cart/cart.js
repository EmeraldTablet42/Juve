import React, { useEffect, useState } from "react";
import Cartheader from "./cartheader";
import Cartlist from "./cartlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/cart.css";
import axios from "axios";
const Cart = () => {
  // 로그인 여부
  const auth = useSelector((state) => state.authindex);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navi = useNavigate();
  //전체 더한가격
  const [totalCartPrice, setTotalCartPrice] = useState(
    cart.cart.reduce((total, item) => total + item.price, 0)
  );

  useEffect(() => {
    getTotalCartPriceByLoginToken();

    if (!auth.isLogined) {
      setTotalCartPrice(
        cart.cart.reduce((total, item) => total + item.price, 0)
      );
    }
  }, [totalCartPrice, cart.cart]);

  //DB에서 카트 받아오기
  const getTotalCartPriceByLoginToken = () => {
    if (auth.isLogined)
      axios
        .get(
          `http://localhost:8090/order/get.cart?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          // alert(JSON.stringify(res.data.carts));
          // const carts = res.data.carts;
          // alert(JSON.stringify(carts));
          setTotalCartPrice(
            res.data.carts.reduce((total, item) => total + item.price, 0)
          );
        })
        .catch(() => {
          alert("DB통신에러. 잠시 후 다시 이용해주세요.");
          navi("/");
        });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-title">장바구니</div>
      <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
      <div className="cart-header">
        <Cartheader />
      </div>
      <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
      <div className="cartlist">
        <Cartlist />
      </div>
      <div
        className="go-purchase"
        style={{
          textAlign: "right",
          fontSize: "24pt",
          marginRight: "20px",
          marginBottom: "20px",
        }}
      >
        <p>전체 상품 가격 :{totalCartPrice}</p>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <button
          onClick={() => {
            navi("/purchase");
          }}
          style={{ width: "150px", height: "70px" }}
        >
          구매 예약
        </button>
      </div>
    </div>
  );
};

export default Cart;
