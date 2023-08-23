import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductGet = () => {
  const category = {
    SAL: "샐러드",
    SDR: "샐러드-드레싱",
    SMT: "샐러드-메인토핑",
    SST: "샐러드-서브토핑",
    SSM: "샐러드-보조메뉴",
    WIH: "샌드위치",
    WMT: "샌드위치-메인토핑",
    WST: "샌드위치-보조토핑",
    CUP: "컵과일",
    BEV: "음료",
  };
  //DB 객체를 state에 지정함
  const [productDB, setProductDB] = useState([]);

  const get = () => {
    axios.get("http://localhost:8080/product.get").then((res) => {
    //   alert(JSON.stringify(res.data.products));
      setProductDB(res.data.products);
    });
  };

  const productTr = productDB.map((v, i) => (
    <tr>
      <td>{category[v.category]}</td>
      <td>{v.productCode}</td>
      <td>{v.productName}</td>
      <td>{v.productPrice}</td>
      <td>
        <Link to={`/product/update?id=${v.productCode}`}>수정</Link>/
        <Link to="">삭제</Link>
      </td>
    </tr>
  ));

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <h1>상품 관리</h1>
      <h3>상품목록</h3>
      <hr />
      <table>
        <tr>
          <th>품목</th>
          <th>상품코드</th>
          <th>상품명</th>
          <th>금액</th>
          <th>수정/삭제</th>
        </tr>
        {productTr}
      </table>
    </>
  );
};

export default ProductGet;
