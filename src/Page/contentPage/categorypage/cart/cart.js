import React from 'react'
import Cartheader from './cartheader'
import Cartlist from './cartlist'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import "../styles/cart.css"
const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const navi = useNavigate();
    //전체 더한가격
    const totalCartPrice = cart.cart.reduce((total, item) => total + item.price, 0);
  return (
    <div className='cart-wrapper'>
        <div className='cart-title'>장바구니</div>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cart-header'>
            <Cartheader />
        </div>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cartlist'>
            <Cartlist />
        </div>
        <div className='go-purchase' style={{textAlign:"right", fontSize:"24pt", marginRight:"20px", marginBottom:"20px"}}>
          <p>전체 상품 가격 :{totalCartPrice}</p>
          <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
          <button onClick={() =>{
            navi("/purchase");}} style={{width:"150px", height:"70px"}}>구매 예약</button>
        </div>
    </div>
  )
}

export default Cart