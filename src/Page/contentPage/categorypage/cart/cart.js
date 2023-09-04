import React from 'react'
import Cartheader from './cartheader'
import Cartlist from './cartlist'
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const addedMenus = useSelector((state) => state.menu);
  return (
    <div>
        <p>장바구니</p>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cart-header'>
            <Cartheader />
        </div>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cartlist'>
            <Cartlist cartData={addedMenus}/>
        </div>
    </div>
  )
}

export default Cart