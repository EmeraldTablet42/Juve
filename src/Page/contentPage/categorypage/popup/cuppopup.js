import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import popUpSlice, { setPopUpSlice } from "../../../system/popUpSlice";
import { setCart } from "../components/cartSlice";
import Count from "../components/count";
import "../styles/popupcart.css";
import axios from "axios";
import Background from "../../../system/background";
import "../../../index/index.css";
const Cuppopup = (props) => {
  const { productId, setPopupState, cupData = {} } = props;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(cupData.productPrice);
  const cTn = useSelector((state) => state.codeToName).productCodeToName;
  const navi = useNavigate();

  /// 팝업 열릴때 스크롤 금지
  useEffect(() => {
    // 팝업이 열릴 때 스크롤 금지
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 스크롤 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCountChange = (newCount) => {
    if (newCount > 0) {
      setCount(newCount);
    }
  };
  const dispatch = useDispatch();
  const [added, setAdded] = useState([]);

  const addMenu = () => {
    const existingIndex = added.findIndex((item) => {
      // 날짜를 제외한 모든 옵션을 비교
      return item.productCode === cupData.productCode;
    });

    if (existingIndex !== -1) {
      // 같은 옵션이 이미 있는 경우 수량만 증가
      const updatedAdded = added.slice();
      updatedAdded[existingIndex].count += count;
      updatedAdded[existingIndex].price =
        updatedAdded[existingIndex].count * totalPrice; // 총 가격 업데이트
      setAdded(updatedAdded);
    } else {
      // 같은 옵션이 없는 경우 새로운 아이템 추가
      setAdded([
        ...added,
        {
          productCode: cupData.productCode,
          count: count,
          price: totalPrice * count,
          date: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
        },
      ]);
    }
    initialize();
  };

  const initialize = () => {
    setCount(1);
    setTotalPrice(cupData.productPrice);
  };

  /// 추가된 메뉴 개별 삭제
  const handleRemoveItem = (index) => {
    const updatedAdded = added.slice(); // 배열 복사
    updatedAdded.splice(index, 1); // 인덱스에 해당하는 요소 제거
    setAdded(updatedAdded); // 업데이트된 배열로 상태 업데이트
  };

  const auth = useSelector((state) => state.authindex);
  const goCart = (e) => {
    if (added.length === 0) {
      alert("메뉴를 추가해주세요.");
      return null;
    }
    regCartDB();
  };

  const goOrder = () => {
    if (added.length === 0) {
      alert("메뉴를 추가해주세요.");
      return null;
    }
    axios
      .post("http://localhost:8090/order/reg.cart", added, {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        // alert(res.data);
        if (!auth.isLogined) {
          dispatch(setCart(added));
        }
        navi("/purchase");
      })
      .catch(() => {
        alert("DB통신에러. 잠시 후 다시 시도해주세요.");
        navi("/");
      });
  };

  const regCartDB = () => {
    // alert(JSON.stringify(added));
    axios
      .post("http://localhost:8090/order/reg.cart", added, {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        // alert(res.data);
        if (!auth.isLogined) {
          dispatch(setCart(added));
        }
        setPopupState(false);
        dispatch(setPopUpSlice({ ...popUpSlice, cartComplete: true }));
      })
      .catch(() => {
        navi("/");
      });
  };

  return (
    <>
      <Background />
      <div className="popupcart-wrapper">
        <button
          className="popupcart-close"
          onClick={() => setPopupState(false)}
        >
          x
        </button>
        <div className="popup-image">
          <img
            src={`http://localhost:8090/product/photo/${cupData.productPhoto}`}
            alt="상품 이미지"
            style={{ width: "300px" }}
          />
        </div>
        <div className="popupcart-option-wrapper">
          <h2 className="popupcart-productname">{cupData.productName}</h2>
          <h2 className="popupcart-productname">{cupData.productPrice}</h2>
          <Count count={count} setCount={handleCountChange} />

          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {
              <div className="menu-item">
                {cupData.productName}
                <br />
                수량 : {count}
                <br />총 가격 : {totalPrice * count}
              </div>
            }
            <div
              style={{
                display: "block",
                textAlign: "left",
              }}
              className="addedMenus"
            >
              {added.map((v, i) => (
                <div className="menu-item" key={i}>
                  <div className="item-product-info">
                    {/* {JSON.stringify(v)} */}
                    {cTn[v.productCode]}
                    <br />
                    {`수량 :${v.count}`}
                    <br />
                    {`총가격 :${v.price}`}
                    <br />
                  </div>
                  <div className="delete">
                    <button onClick={() => handleRemoveItem(i)}>x</button>
                  </div>
                </div>
              ))}
            </div>
            <div />
          </div>
          <button onClick={addMenu}>메뉴담기</button>
          <button className="default-button" onClick={goOrder}>
            구매예약
          </button>
          <button onClick={goCart}>장바구니에 담기</button>
        </div>
      </div>
    </>
  );
};

export default Cuppopup;
