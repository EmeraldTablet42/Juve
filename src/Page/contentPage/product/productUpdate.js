import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import preview300 from "../../../img/product/preview300.png";
import preview500 from "../../../img/product/preview500.png";

const ProductUpdate = () => {
  // 제품 상태 변화를 담는 state
  const [productData, setProductData] = useState({
    category: "",
    productNum: 0,
    productName: "",
    productPrice: 0,
    photoUrl: null,
    photoFile: "",
  });

  const handleProduct = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    // alert(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setProductData({
        ...productData,
        photoUrl: imageURL,
        photoFile: selectedFile,
      });
    }
  };

  // DB 등록//////////////////////////////////////////////////////

  const fd = new FormData();
  fd.append(
    "productCode",
    `${productData.category}-${productData.productNum
      .toString()
      .padStart(3, "0")}`
  );
  fd.append("category", productData.category);
  fd.append("productNum", productData.productNum);
  fd.append("productName", productData.productName);
  fd.append("productPrice", productData.productPrice);
  fd.append("productPhotoFile", productData.photoFile);
  fd.append("productPhoto", productData.productPhoto);

  const photoInput = useRef();

  const upload = () => {
    // alert(JSON.stringify(productData));
    axios
      .post("http://localhost:8080/product.upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        alert("등록성공");
        setProductData({
          category: "",
          productNum: 0,
          productName: "",
          productPrice: 0,
          photoUrl: null,
          photoFile: "",
        });
        get();
      });
  };

  //DB 객체를 state에 지정함
  const [searchParam, setSearchParam] = useSearchParams();

  const get = () => {
    axios
      .get(`http://localhost:8080/product.getById?id=${searchParam.get("id")}`)
      .then((res) => {
        alert(JSON.stringify(res.data));
        if (res.data.productPhoto !== null) {
          setProductData({
            ...res.data,
            photoUrl: `http://localhost:8080/product/photo/${res.data.productPhoto}`,
          });
        } else {
          setProductData(res.data);
        }
      });
  };

  const show = () => {
    alert(JSON.stringify(productData));
  };

  // 취소 누르면 뒤로가기
  const navi = useNavigate();

  // 페이지 로딩시 DB객체를 불러옴
  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <h1>상품 수정</h1>
      <h3>상품정보</h3>
      <hr />
      <table>
        <th>품목</th>
        <td>
          <select
            name="category"
            value={productData.category}
            onChange={handleProduct}
            readOnly
          >
            <option value="">품목 선택</option>
            <option value="SAL">샐러드</option>
            <option value="SDR">샐러드-드레싱</option>
            <option value="SMT">샐러드-메인토핑</option>
            <option value="SST">샐러드-서브토핑</option>
            <option value="SSM">샐러드-보조메뉴</option>
            <option value="WIH">샌드위치</option>
            <option value="WMT">샌드위치-메인토핑</option>
            <option value="WST">샌드위치-보조토핑</option>
            <option value="CUP">컵과일</option>
            <option value="BEV">음료</option>
          </select>
        </td>
        <tr>
          <th>번호</th>
          <td>
            <input
              name="productNum"
              value={productData.productNum}
              onChange={handleProduct}
              readOnly
            />
          </td>
        </tr>
        <tr>
          <th>상품코드</th>
          <td>
            <input
              name="productCode"
              value={`${productData.category}-${productData.productNum
                .toString()
                .padStart(3, "0")}`}
              onChange={handleProduct}
              readOnly
            />
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <input
              name="productName"
              value={productData.productName}
              onChange={handleProduct}
            />
          </td>
        </tr>
        <tr>
          <th>가격</th>
          <td>
            <input
              name="productPrice"
              value={productData.productPrice}
              onChange={handleProduct}
            />
          </td>
        </tr>
      </table>
      <h3> 상품이미지</h3>
      <hr />
      <table style={{ marginLeft: "auto", marginRight: "auto" }}>
        <tr>
          <td valign="bottom">
            <img
              src={productData.photoUrl ?? preview500}
              alt="preview500"
              style={{
                margin: "50px",
                width: "500px",
                height: "500px",
                border: "1px solid black",
              }}
            ></img>
          </td>
          <td>
            <img
              src={productData.photoUrl ?? preview300}
              alt="preview500"
              style={{
                margin: "50px",
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
            ></img>
          </td>
        </tr>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <input
          id="inputPhoto"
          ref={photoInput}
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label for="inputPhoto">등록</label>
        <button
          style={{ margin: "0 10px" }}
          onClick={() => {
            setProductData({
              ...productData,
              photoUrl: null,
              photoFile: "",
            });
          }}
        >
          삭제
        </button>
      </div>

      <div>
        <button onClick={upload}>상품 수정</button>
        <button onClick={show}>조회</button>
        <button
          onClick={() => {
            navi(-1);
          }}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default ProductUpdate;
