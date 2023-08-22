import React, {useState} from 'react'
import sampleImage from '../static/orange.png'
import '../styles/thumbnail.css';
import Popupcart from "./popupcart"

const Thumbnail = ({imgSrc ,name, price, isLike, isCartSelect, productId}) => {

  const [popupState, setPopupState] = useState(false);
  const [detailstate, setDetailState] = useState(false);
  const goToCart = () => {
    const userInfo = {username: '고건영', userPk: 1};
    setPopupState(true);
  }
  const goTodetail = () => {
    const userInfo = {username: '고건영', userPk: 1};
    setPopupState();
  }
  
  return (
    <div className='product-thumbnail-wrapper'>
      {/*{imgSrc ?? sampleImage} <- ??는 imgSrc가 없을 때 sampleImage를 반환한다  */}
        <img  src={imgSrc ?? sampleImage} width={"200px"} height={"200px"} alt='상품 이미지' />
        <h3>{name}</h3>
        <div className='product-thumbnail-detail'>
          <p>{price}원</p>
          <button>찜</button>
          <button onClick={() => goToCart()}>장바구니</button>
        </div>
        {popupState &&
          <div className='cart-popup-wrapper'>
            <Popupcart productId={productId} userInfo={{username: '고건영', userPk: 1}} setPopupState = {setPopupState} />
          </div>
        }
      </div>
  )
}

export default Thumbnail