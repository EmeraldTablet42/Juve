import React, {useState, useEffect} from 'react'
import sampleImage from './static/orange.png'

const mockData= {
    imgSrc: sampleImage,
    productName: '골라담는 샐러드',
    productPrice: '4500',
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

const Detailmenu = (props) => {
    const [detailData, setDetailData] = useState({imgSrc: '', productName: '', productPrice: '', required: [], additional: []})

    const {productId, userInfo: {username, userPk}} = props;
  
    useEffect(() => {
      if(productId && userPk) {
        setDetailData(mockData);
      }
    },[productId, userPk])

  return (
    <div className='detail-wrapper'>
        <div className='detail-image'>
            <img src={sampleImage} alt='상품 이미지' width="80%" height="80%"/>
        </div>
        <div className='detail-option'>
            <p>productName</p>
            <p>productPrice</p>
              {detailData.required.length !== 0 &&
                detailData.required.map(({name, items}) => (
                  <select>
                    <option value='' hidden>[필수]{name} 선택</option>
                    {
                      items.map(({item, price}) => (
                        <option value={price}>{item}</option>
                      ))
                    }
                  </select>
                ))
              }
              {detailData.additional.length !== 0 &&
                detailData.additional.map(({name, items}) => (
                  <select>
                    <option value='' hidden>[선택]{name} 추가 선택</option>
                    {
                      items.map(({item, price}) => (
                        <option value={price}>{item}</option>
                      ))
                    }
                  </select>
                ))
              }
            </div>
            <div>
                
            </div>
    </div>
  )
}

export default Detailmenu