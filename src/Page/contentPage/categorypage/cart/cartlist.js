import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart.css";
import { removeFromCart } from "../components/cartSlice";
import axios from "axios";
const Cartlist = () => {
  //카운팅 useState부분에 받아온 데이터의 카운팅값을 기본값으로 넣을예정
  const [count, setCount] = useState(1);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  // dbData
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      setAllData(res.data.products);
    });
  }, []);
  //데이터 비교
  // redux데이터 부분
  const dispatch = useDispatch();

  // redux에 저장된 cart 배열
  const cart = useSelector((state) => state.cart);

  // 제품코드(key) 제품명(value)로 쌍을 이룬 객체
  // 굳이 쓰는이유 = DB통신을 할때 제품명이 아니라 제품 코드 기준으로 해야됨(무결성)
  // 제품명은 제품수정때 변경 가능하지만 제품코드는 불변이기 때문에
  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  //// 개별 카트 추가된거 삭제하는 함수
  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };
  // 갯수 카운트
  return (
    <>
      {/*<button
        onClick={() => {
          alert(JSON.stringify(cart));
        }}
      >
        {" "}
        장바구니 객체조회
      </button>*/}
      <div className="cart-view">
        {cart.cart.map((v, i) => {
          const productData = allData.find((data) => data.productCode === v.productCode);
          const imageUrl = productData ? `http://localhost:8090/product/photo/${productData.productPhoto}` : '';
          //일단 menu-item 클래로 css 임시로 설정해둠
          // src\Page\contentPage\categorypage\styles\popupcart.css <- 여기에 가면 해당 css 설정 있음
          return(
          <div className="menu-item" key={i}>
            <div className="product-image">
              <img src={imageUrl} alt="상품이미지" style={{width:"150px", height:"150px", justifyContent: "center", alignItems:"center"}} />
            </div>
            <div className="product-item" style={{ textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column" }}>
              {cTn[v.productCode]}
              {/* 이부분 누르면 배열에서 삭제됨 */}
              <br />
              {/* cTn(codeToName) 넣은 이유 = 코드명 -> 제품이름으로 변환 */}
              {v.sdrValue && `드레싱 :${cTn[v.sdrValue]}`}
              <br />
              {/* && 앞에 해당제품 있을때만 map 돌림 안쓰면 오류터짐 */}
              {v.smtValue &&
                `메인토핑 :${v.smtValue.map((code) => cTn[code]).join(", ")}`}
              {v.wmtValue &&
                `메인토핑 :${v.wmtValue.map((code) => cTn[code]).join(", ")}`}
              <br />
              {v.sstValue &&
                `서브토핑 :${v.sstValue.map((code) => cTn[code]).join(", ")}`}
              {v.wstValue &&
                `서브토핑 :${v.wstValue.map((code) => cTn[code]).join(", ")}`}
              <br />
              {v.ssmValue &&
                `보조메뉴 :${v.ssmValue.map((code) => cTn[code]).join(", ")}`}
            </div>
            <div className="product-price">
              {`수량 :${v.count}`}
              <br />
              {`총가격 :${v.price}`}
              <br />
            </div>
            <div className="delete">
              <button onClick={() => handleRemoveItem(i)}>x</button>
            </div>
          </div>
          )
})}
      </div>
    </>
  );
};

export default Cartlist;
