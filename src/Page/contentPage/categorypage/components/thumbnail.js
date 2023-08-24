import React, {useEffect, useState} from 'react' 
import '../styles/thumbnail.css';
import Popupcart from "./popupcart"
import { Link } from 'react-router-dom';
import Detailmenu from '../detailmenu';
const Thumbnail = ({productData}) => {
  const [popupState, setPopupState] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const goToCart = () => {
    setPopupState(true);
  }
  if (!productData || productData.length === 0) {
    return null;
  }

  const handleImageClick = (product) => {
    setSelectedData(product);
    alert(JSON.stringify(selectedData));
  };
  return (
    <div className='product-thumbnail-wrapper'>
       <div className='product-thumbnail-grid'>
        {productData.map((product) => (
          <div className='product-thumbnail' key={product.productCode}>
            <Link to='/detail' style={{ display: 'inline-block' }}>
                <img
                 src={`http://localhost:8090/product/photo/${product.productPhoto}`}
                 alt='상품 이미지' 
                 style={{ width: '200px',height: '200px',}}
                 onClick={() => handleImageClick(product)}
                />
            </Link>
            <h3 style={{textAlign:"center"}}>{product.productName}</h3>
            <div className='product-thumbnail-detail'>
              <p>{product.productPrice}원</p>
              <button>찜</button>
              <button onClick={() => goToCart()}>장바구니</button>
            </div>
            {popupState && (
              <div className='cart-popup-wrapper'>
                <Popupcart productData={productData} productId={product.productCode} setPopupState={setPopupState} userInfo = {{username: '고건영', userPk: 1}} />
              </div>
          )}
        </div>
      ))}
        {false && selectedData && <Detailmenu productData={[selectedData]}/> }
      </div>
    </div>
  )
}

export default Thumbnail