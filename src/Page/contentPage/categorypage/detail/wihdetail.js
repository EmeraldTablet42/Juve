import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import '../styles/saldetail.css';


const Wihdetail = () => {
  const [detailData, setDetailData] = useState({});
  const [wihData, setWihData] = useState([]);
  const [wmtData, setWmtData] = useState([]);
  const [wstData, setWstData] = useState([]);
  const [slectedData, setSelectedData] = useState([]);

  const [selectedWmtOptions, setSelectedWmtOptions] = useState([]);
  const [selectedWstOptions, setSelectedWstOptions] = useState([]);

  const [isOpenWmt, setIsOpenWmt] = useState(false);
  const [isOpenWst, setIsOpenWst] = useState(false);
  const ref = useRef(null);

  useEffect(()=> {
    const onClick = (e) => {
      if (ref.current !== null& !ref.current.contains(e.target)){
        setIsOpenWmt(!isOpenWmt)
      }
    };
      if (isOpenWmt) {
        window.addEventListener("click", onClick);
      }
      return ()=> {
        window.removeEventListener("click", onClick);
      };
  }, [isOpenWmt])

  useEffect(()=> {
    const onClick = (e) => {
      if (ref.current !== null& !ref.current.contains(e.target)){
        setIsOpenWst(!isOpenWst)
      }
    };
      if (isOpenWst) {
        window.addEventListener("click", onClick);
      }
      return ()=> {
        window.removeEventListener("click", onClick);
      };
  }, [isOpenWst])

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;
      const wFilterData = allProduct.filter(
        (product) => product.category === "WIH"
      );
      setWihData(wFilterData);
      const wmtFilterData = allProduct.filter(
        (product) => product.category === "WMT"
      );
      setWmtData(wmtFilterData);
      const wstFilterData = allProduct.filter(
        (product) => product.category === "WST"
      );
      setWstData(wstFilterData);
    });
  }, []);
  const handleWmtChange = (productId) => {
    setSelectedWmtOptions((prevOptions) => {
      if (prevOptions.includes(productId)) {
        return prevOptions.filter((item) => item !== productId);
      } else {
        return [...prevOptions, productId];
      }
    });
  };

  const handleWstChange = (value) => {
    setSelectedWstOptions(value)
  };
  const Dropdownwmt =() =>{
    setIsOpenWmt(!isOpenWmt);
  }

  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${detailData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: "500px" }}
        />
      </div>
      <p>상 품 : {detailData.productName} </p>
      <p>가 격 : {detailData.productPrice} </p>
      <div className="sdrOption">
        <div className="dropdown" ref={ref}>
          <div className="dropdown-header" onClick={Dropdownwmt}>
            메인토핑 (다중 선택 가능)
          </div>
          {isOpenWmt && (
            <ul className="checkbox-list">
              {wmtData.map(({ productId, productName, productPrice }) => (
                <li key={`wmt-${productId}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={productId}
                      onChange={(e) => handleWmtChange(e.target.value)}
                    />
                    {productName}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <div className="submenu">
          {wstData.map(({ productId, productName, productPrice }) => (
                <li key={`wst-${productId}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={productId}
                      onChange={(e) => handleWstChange(e.target.value)}
                    />
                    {productName}
                  </label>
                </li>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Wihdetail;