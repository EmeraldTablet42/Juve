import React, { useState } from 'react'
import Cartheader from './cartheader'
import Cartlist from './cartlist'

const newData ={
    productName:"샌드위치",
    productPrice:"2000원"
}
const Cart = () => {
    const[cartproduct, setCartProduct] = useState([]);

    const addNewData = (newData) => {
         const updataCart = [...cartproduct, newData];
         setCartProduct(updataCart);
    }
  return (
    <div>
        <p>장바구니</p>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cart-header'>
            <Cartheader />
        </div>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div className='cartlist'>
            <Cartlist dummyData={cartproduct}/>
        </div>
    </div>
  )
}

export default Cart