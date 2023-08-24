import React, { useEffect, useState } from 'react'

const Detailmenu = (productData) => {
  const DataArray = Object.values(productData);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleOptionChange = (productName, productPrice, category) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.product.productName !== productName);
      if (productPrice >0) {
        const updatedOption = {category, productName, productPrice};
        setSelectedOptions([...updatedOptions, updatedOption])
      }
      else{
        setSelectedOptions(updatedOptions);
      }
  }
  return (
    <div className='Detail-wrapper'>
      {DataArray.map((item) => (
        <div className='Detail-item' key={item.productNum}>
          <div className='Detail-image'>
            <img src={item.productPhoto} alt='상품 이미지' />
          </div>
          <div className='Detail-option'>
            <p>상품명 : {item.productName}</p>
            <p>가 격 : {item.productPrice}</p>
            <select key={item.category}
            onChange={(e)=>
            handleOptionChange(item.productName, e.target.value, e.target.selectedOptions[0].getAttribute('data-price'))}>
              <option value="" hidden>
                {item.productName} 선택
              </option>
              <option key={item.Num} value={item.productName} data-price={item.productPrice}>
                {item.productName}
              </option>
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Detailmenu