import React, {useState, useEffect} from 'react'
import '../styles/popupcart.css';
import sampleImage from '../static/orange.png'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import Count from './count';

const mockData= {
  imgSrc: sampleImage,
  productName: '골라담는 샐러드',
  required: [
    {name: '상품선택', items: [{item: '상품1', price: 1000}, {item: '상품2', price: 2000}, {item: '상품3', price: 3000}]}, 
    {name: '샐러드 드레싱 선택', items: [{item: '드레싱1', price:500}, {item: '드레싱2', price:1500}, {item: '드레싱3', price:1000}]}
  ],
  additional: [
    {name: '샐러드 메인토핑', items: [{item: '메인토핑1', price: 1000}, {item: '메인토핑2', price: 2000}, {item: '메인토핑3', price: 3000}]}, 
    {name: '샐러드 서브토핑', items: [{item:'서브토핑1', price: 1000}, {item:'서브토핑2', price: 1500}, {item:'서브토핑3', price: 2000}]}, 
    {name: '샐러드 보조메뉴', items: [{item: '보조메뉴1', price: 200}, {item: '보조메뉴2', price: 200}, {item: '보조메뉴3', price: 300}]}
  ]
}
const PopupCart = (props) => {
  const [count, setCount] = useState(1);
  const [cartData, setCartData] = useState({imgSrc: '', productName: '', required: [], additional: []})
  const {productId, userInfo: {username, userPk}, setPopupState} = props;
  useEffect(() => {
    if(productId && userPk) {
      // server api 통해 데이터 가져오는게 여기 담기겠지?
      setCartData(mockData);
    }
  },[productId, userPk])
  
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (groupName, optionName, price) => {
    const updatedOptions = selectedOptions.filter((option) => option.groupName !== groupName);
    const updatedOption = { groupName, optionName, price};
    setSelectedOptions([...updatedOptions, updatedOption]);
  };
  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  const handlePurchaseConfirm = () => {
    if (selectedOptions.length > 0) {
      const alertMessage = selectedOptions.map(
        (option) =>
          `${option.groupName}: ${option.optionName} (+${option.price}원)`
      );
      const totalSelectedPrice = selectedOptions.reduce((total, option) => total + parseInt(option.price), 0);
      const totalCoutPrice = totalSelectedPrice * count;
      alert(`구매확인:\n${alertMessage.join('\n')}\n구매갯수: ${count}\n총 가격:${totalCoutPrice}원`);
    } else {
      alert('구매할 옵션을 선택해주세요.');
    }
  };
  
  return (
        <div className='popupcart-wrapper'>
          <button className='popupcart-close' onClick={() => setPopupState(false)}>x</button>
          <h2 className='popupcart-productname'>{cartData.productName}</h2>
          <div className='popupcart-info'>
            <div className='popupcart-image'>
              <img src={sampleImage} alt='상품 이미지' width="80%" height="80%"/>
            </div>
            <div className="popupcart-option">
        {cartData.required.length !== 0 &&
          cartData.required.map(({ name, items }, groupIndex) => (
            <select
              key={`required-${groupIndex}`}
              onChange={(e) =>
                handleOptionChange(name, e.target.value, e.target.selectedOptions[0].getAttribute('data-price'))
              }
            >
              <option value="" hidden>
                [필수]{name} 선택
              </option>
              {items.map(({ item, price }, itemIndex) => (
                <option key={`required-${groupIndex}-${itemIndex}`} value={item} data-price={price}>
                  {item}
                </option>
              ))}
            </select>
          ))}
        {cartData.additional.length !== 0 &&
          cartData.additional.map(({ name, items }, groupIndex) => (
            <select
              key={`additional-${groupIndex}`}
              onChange={(e) =>
                handleOptionChange(name, e.target.value, e.target.selectedOptions[0].getAttribute('data-price'))
              }
            >
              <option value="" hidden>
                [선택]{name} 추가 선택
              </option>
              {items.map(({ item, price }, itemIndex) => (
                <option key={`required-${groupIndex}-${itemIndex}`} value={item} data-price={price}>
                  {item}
                </option>
              ))}
            </select>
          ))}
      </div>
        </div>
          <div className='popupcart-count'>
            <Count count={count} setCount={setCount}/>
          </div>
          <div>
              <button onClick={handlePurchaseConfirm}>구매확인</button>
          </div>
      </div>
  );
};
 
export default PopupCart