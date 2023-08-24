import React from 'react'
import "./styles/menu.css";
import sampleImage from './static/orange.png'
import Thumbnail from './components/thumbnail'
const Menupage = ({productData}) => {
  return (
    <div>
        <body className='menu-page'>
              <img src={sampleImage} alt='상품이미지'/>
            <div className='menu-grid'>
              <Thumbnail productData={productData}/>
            </div>
        </body>
    </div>
  )
}

export default Menupage