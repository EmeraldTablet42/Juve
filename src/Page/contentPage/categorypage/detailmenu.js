import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Detailmenu = (props) => {
  const { productData } = props;

  return (
    <div className='Detail-wrapper'>
      {productData.map((product) => (
        <div className='Detail-item' key={product.productid}>
          <div className='Detail-image'>
            <img src={product.productPhoto} alt='상품 이미지' />
          </div>
          <div className='Detail-option'>
            <p>상품명 : {product.productName}</p>
            <p>가 격 : {product.productPrice}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Detailmenu