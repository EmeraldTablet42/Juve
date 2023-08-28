import React, {useState} from 'react' 
import '../styles/thumbnail.css';
import Popupcart from "./popupcart"
import { Link } from 'react-router-dom';
import Saldetail from '../detail/saldetail';
import Bevdetail from '../detail/bevdetail';
import Cupdetail from '../detail/cupdetail';
import Wihdetail from '../detail/wihdetail';
const Thumbnail = ({productData}) => {
  const [popupState, setPopupState] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const goToCart = () => {
    setPopupState(true);
  }

  const handleImageClick = (product) => {
    setSelectedData(product);
  };

  // 버뀌어서 여기자체에서는 잘 담기는데 Link클릭해서 ㅍ이지넘어갈떄 그데이터값들이
  // 같이안넘어가짐
  // Link 

  return (
    <div className='product-thumbnail-wrapper'>
       <div className='product-thumbnail-grid'>
        {productData.map((product) => (
          <div className='product-thumbnail' key={product.productCode}>
            <Link to={product.category === 'SAL' ? `/saldetail?id=${product.productCode}` :
                      product.category === 'CUP' ? `/cupdetail?id=${product.productCode}` :
                      product.category === 'WIH' ? `/wihdetail?id=${product.productCode}` :
                      product.category === 'BEV' ? `/bevdetail?id=${product.productCode}` :
                       ``} style={{ display: 'inline-block' }}>
                <img
                 src={`http://localhost:8090/product/photo/${product.productPhoto}`}
                 alt='상품 이미지' 
                 style={{ width: '300px',height: '300px',}}
                 onClick={() => {handleImageClick(product);
                 console.log(selectedData);}}
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
        {/* {false && selectedData && <Detailmenu productData={[selectedData]}/> } */}
        {false && <Saldetail detailData={selectedData} />}
        {false && <Bevdetail detailData={selectedData} />}
        {false && <Wihdetail detailData={selectedData} />}
        {false && <Cupdetail detailData={selectedData} />}
      </div>
    </div>
  )
}

export default Thumbnail