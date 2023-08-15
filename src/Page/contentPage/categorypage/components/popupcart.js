import React, {useState} from 'react'
import '../styles/popupcart.css';

const PopupCart = (props) => {
  const {productId, userInfo: {username, userPk}, setPopupState} = props;
  
  return (
        <div className='popupcart-wrapper'>
          <div className='info-wrapper'>popupCart
          {productId}
          {username}
          {userPk}
          </div>
          <button onClick={setPopupState(false)}>닫기</button>
        </div>
  );
};
 
export default PopupCart