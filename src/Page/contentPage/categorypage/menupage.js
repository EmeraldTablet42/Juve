/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react'
import "./styles/menu.css";
import sampleImage from './static/orange.png'
import Thumbnail from './components/thumbnail'

const Menupage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // 서버로부터 data를 받아와서 setState
    setData([
      { name: 'product1', price: '1000', isLike: true, isCartSelect: true, productId: 1 },
      { name: 'product2', price: '2000', isLike: true, isCartSelect: false, productId: 2 },
      { name: 'product3', price: '3000', isLike: true, isCartSelect: true, productId: 3 },
      { name: 'product4', price: '4000', isLike: false, isCartSelect: false, productId: 4 },
      { name: 'product5', price: '5000', isLike: false, isCartSelect: true, productId: 5 },
      { name: 'product6', price: '6000', isLike: false, isCartSelect: false, productId: 6 },
      { name: 'product1', price: '1000', isLike: true, isCartSelect: true, productId: 7 },
      { name: 'product2', price: '2000', isLike: true, isCartSelect: false, productId: 8 },
      { name: 'product3', price: '3000', isLike: true, isCartSelect: true, productId: 9 },
      { name: 'product4', price: '4000', isLike: false, isCartSelect: false, productId: 10 },
      { name: 'product5', price: '5000', isLike: false, isCartSelect: true, productId: 11 },
      { name: 'product6', price: '6000', isLike: false, isCartSelect: false, productId: 12 },
      { name: 'product1', price: '1000', isLike: true, isCartSelect: true, productId: 13 },
      { name: 'product2', price: '2000', isLike: true, isCartSelect: false, productId: 14 },
      { name: 'product3', price: '3000', isLike: true, isCartSelect: true, productId: 15 },
      { name: 'product4', price: '4000', isLike: false, isCartSelect: false, productId: 16 },
      { name: 'product5', price: '5000', isLike: false, isCartSelect: true, productId: 17 },
      { name: 'product6', price: '6000', isLike: false, isCartSelect: false, productId: 18 },
    ]
    )
  },[])
  return (
    // imgSrc ,name, price, isLike, isCartSelect
    <div>
        <body className='menu-page'>
            <img src={sampleImage}/>
            <div className='menu-grid'>
              {data?.map(({name, price, isLike, isCartSelect, productId}) => (
                <div key={`thumbnail-${productId}`}>
                  <Thumbnail name={name} price={price} isLike={isLike} isCartSelect={isCartSelect} productId={productId}/>
                </div>
                )
              )}
            </div>
        </body>
    </div>
  )
}

export default Menupage