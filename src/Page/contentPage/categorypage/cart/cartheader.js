import React from 'react'
import "../styles/cart.css";
const Cartheader = () => {
  return (
    <div className='header-main'>
        <p style={{width:"300px", textAlign:"center"}}>상품 이미지</p>
        <p style={{width:"450px", textAlign:"center"}}>상품정보</p>
        <p style={{width:"450px", textAlign:"center"}}>수량/상품금액</p>
    </div>
  )
}

export default Cartheader