import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Paging from "./paging";
import Pagination from "react-js-pagination";

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
  const [searchParam, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParam.get("page")));
  const [totalPage, setTotalPage] = useState();
  const navi = useNavigate();

  const handlePageChange = (pagee) => {
    goPage(pagee);
    get();
    // setSearchParam(newSearchParams);
    // get();
    // setPage(pagee);
  };

  const goPage = (page) => {
    const newSearchParams = new URLSearchParams(searchParam);
    newSearchParams.set("page", page);
    alert(newSearchParams);
    navi(`/product/get?${newSearchParams}`);
  };

  const get = () => {
    // alert(page);
    // alert(searchParam);
    axios
      .get(
        // `http://localhost:8090/product.getByPage?page=${searchParam.get("page")}&search=${searchParam.get("search")}&category=${searchParam.get("category")}&price=${searchParam.get("price")}`
        `http://localhost:8090/product.getByPage?${searchParam}`
      )
      .then((res) => {
        //   alert(JSON.stringify(res.data.products));
        setProductDB(res.data.products);
        setTotalPage(res.data.totalPage);
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
        <Link
          to={`http://localhost:8090/product.delete?productCode=${v.productCode}`}
        >
          삭제
        </Link>
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
      <table border={1}>
        <tr>
          <th>품목</th>
          <th>상품코드</th>
          <th>상품명</th>
          <th>금액</th>
          <th>수정/삭제</th>
        </tr>
        {productTr}
      </table>
      <div>
        {parseInt(searchParam.get("page")) - 1}
        {parseInt(searchParam.get("page")) + 1}
        <Pagination
          activePage={page}
          itemsCountPerPage={1}
          totalItemsCount={totalPage}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductGet;
