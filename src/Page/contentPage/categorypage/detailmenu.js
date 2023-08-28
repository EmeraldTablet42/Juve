import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filterdata from "./components/filterdata";

const Detailmenu = () => {
  const filteredData = Filterdata();

  const [selectedCate , setSelectedCate] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [detailData, setDetailData] = useState(null);

  const handleCheckbox = (category) => {
    if (selectedCate.includes(category)) {
      setSelectedCate(selectedCate.filter(cat => cat !== category));
    } else {
      setSelectedCate([...selectedCate, category]);
    }
  };

  const handleOptionChange = (productName, productPrice, category) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.product.productName !== productName
    );
    if (productPrice > 0) {
      const updatedOption = { category, productName, productPrice };
      setSelectedOptions([...updatedOptions, updatedOption]);
    } else {
      setSelectedOptions(updatedOptions);
    }
  };
  const [searchParam] = useSearchParams();

  const getId = () => {
    axios
      .get(`http://localhost:8090/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        setDetailData(res.data);
      });
  };

  useEffect(() => {
    getId();
  }, []);
  
  
  return (
    <div className="Detail-wrapper">
      {detailData && (
        <div className="Detail-detailData" key={detailData.productNum}>
          <div className="Detail-image">
            <img src={`http://localhost:8090/product/photo/${detailData.productPhoto}`} alt="상품 이미지" style={{width:"500px"}}/>
          </div>
          <div className="Detail-option">
            <p>상품명 : {detailData.productName}</p>
            <p>가 격 : {detailData.productPrice}</p>
            <div className="detail-selcet"/>
            <select
              key={filteredData.category}
              onChange={(e) =>
                handleOptionChange(
                  filteredData.productName,
                  e.target.value,
                  e.target.selectedOptions[0].getAttribute("data-price")
                )
              }
            >
              <option value="" hidden>
                {filteredData.productName} 선택
              </option>
              <option
                key={filteredData.Num}
                value={filteredData.productName}
                data-price={filteredData.productPrice}
              >
                {filteredData.productName}
              </option>
            </select>
            <div>
              {filteredData.map((option) => (
                <label key={option.productId}>
                  <input
                    type="checkbox"
                    value={option.productName}
                    checked={selectedOptions.includes(option.category)}
                    onChange={() =>
                      handleCheckbox(option.category)
                    }
                  />
                  {option.productName}
                </label>
              ))}
            </div>
        </div>
      </div>
    )}
  </div>
);
}
export default Detailmenu;
