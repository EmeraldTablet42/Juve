import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import "./paging.css";

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
  const [totalPage, setTotalPage] = useState();
  const [popUp, setPopUp] = useState({
    pg_category: false,
    pg_price: false,
  });
  const [categoryChecked, setCategoryChecked] = useState({
    SAL_ALL: false,
    SAL: false,
    SDR: false,
    SMT: false,
    SST: false,
    SSM: false,
    WIH_ALL: false,
    WIH: false,
    WMT: false,
    WST: false,
    CUP: false,
    BEV: false,
  });

  // const handleSaladCheck = (e) => {
  //   const isChecked = e.target.checked;
  //   const categoryValue = isChecked
  //     ? (1 << 0) + (1 << 3) + (1 << 5) + (1 << 2) + (1 << 6)
  //     : 0;
  //   setCategoryChecked({
  //     ...categoryChecked,
  //     SAL_ALL:isChecked,
  //     SAL: isChecked,
  //     SDR: isChecked,
  //     SMT: isChecked,
  //     SST: isChecked,
  //     SSM: isChecked,
  //   });
  //   setParams({
  //     ...params,
  //     category: categoryValue,
  //   });
  // };

  const handleCategoryValue = (e) => {
    setCategoryChecked({
      ...categoryChecked,
      [e.target.name]: e.target.checked,
    });
    // alert(e.target.value);
    if (e.target.checked === true) {
      //  alert(e.target.checked);
      setParams({
        ...params,
        category: parseInt(params.category) + parseInt(e.target.value),
        page: 1,
      });
    } else {
      // alert(e.target.checked)
      setParams({
        ...params,
        category: parseInt(params.category) - parseInt(e.target.value),
        page: 1,
      });
    }
  };

  const handlePriceValue = (e) => {
    setParams({
      ...params,
      price: e.target.value,
      page: 1,
    });
  };

  const handleSearchValue = (e) => {
    setParams({
      ...params,
      search: e.target.value,
      page: 1,
    });
  };

  const show = () => {
    alert(JSON.stringify(params));
  };

  const handlePopup = (e) => {
    setPopUp({ ...popUp, [e.target.id]: !popUp[e.target.id] });
  };

  const [params, setParams] = useState({
    page: 1,
    category: 0,
    price: "",
    search: "",
  });
  const handlePageChange = (pagee) => {
    setParams({ ...params, page: pagee });
  };

  const get = () => {
    // alert(page);
    // alert(searchParam);
    axios
      .get(
        // `http://localhost:8090/product.getByPage?page=${searchParam.get("page")}&search=${searchParam.get("search")}&category=${searchParam.get("category")}&price=${searchParam.get("price")}`
        `http://localhost:8090/product.getByPage?page=${params.page}&category=${params.category}&price=${params.price}&search=${params.search}`
      )
      .then((res) => {
        //   alert(JSON.stringify(res.data.products));
        setProductDB(res.data.products);
        setTotalPage(res.data.totalPage);
        console.log(params);
      });
  };

  const updateProduct = (productCode) => {
    window.location.replace(`/product/update?id=${productCode}`);
  };

  const deleteProduct = (productCode) => {
    axios
      .get(`http://localhost:8090/product.delete?productCode=${productCode}`)
      .then(() => {
        alert("삭제 성공");
        get();
      })
      .catch(() => {
        alert("삭제 실패: DB통신 에러");
      });
  };

  const productTr = productDB.map((v, i) => (
    <tr>
      <td>{category[v.category]}</td>
      <td>{v.productCode}</td>
      <td>{v.productName}</td>
      <td>{v.productPrice}</td>
      <td>
        <button
          onClick={() => {
            updateProduct(v.productCode);
          }}
        >
          수정
        </button>
        /
        <button
          onClick={() => {
            deleteProduct(v.productCode);
          }}
        >
          삭제
        </button>
      </td>
    </tr>
  ));

  const categorySelector = (
    <div className="categorySelector" style={{ display: "flex" }}>
      <button onClick={show}>조회</button>
      <ul>
        {/* <li>
          <input
            onChange={handleSaladCheck}
            checked={categoryChecked.SAL_ALL}
            type="checkbox"
          />
          샐러드-전체
        </li> */}
        <li>
          <input
            name="SAL"
            onChange={handleCategoryValue}
            value={1 << 0}
            type="checkbox"
            checked={categoryChecked.SAL}
          />
          샐러드
        </li>
        <li>
          <input
            name="SDR"
            onChange={handleCategoryValue}
            value={1 << 3}
            type="checkbox"
            checked={categoryChecked.SDR}
          />
          샐러드-드레싱
        </li>
        <li>
          <input
            name="SMT"
            onChange={handleCategoryValue}
            value={1 << 5}
            type="checkbox"
            checked={categoryChecked.SMT}
          />
          샐러드-메인토핑
        </li>
        <li>
          <input
            name="SST"
            onChange={handleCategoryValue}
            value={1 << 2}
            type="checkbox"
            checked={categoryChecked.SST}
          />
          샐러드-서브토핑
        </li>
        <li>
          <input
            name="SSM"
            onChange={handleCategoryValue}
            value={1 << 6}
            type="checkbox"
            checked={categoryChecked.SSM}
          />
          샐러드-보조메뉴
        </li>
      </ul>
      <ul>
        {/* <li>
          <input
            onChange={handleCategoryValue}
            type="checkbox"
            checked={categoryChecked.WIH_ALL}
          />
          샌드위치-전체
        </li> */}
        <li>
          <input
            name="WIH"
            onChange={handleCategoryValue}
            value={1 << 1}
            type="checkbox"
            checked={categoryChecked.WIH}
          />
          샌드위치
        </li>
        <li>
          <input
            name="WMT"
            onChange={handleCategoryValue}
            value={1 << 9}
            type="checkbox"
            checked={categoryChecked.WMT}
          />
          샌드위치-메인토핑
        </li>
        <li>
          <input
            name="WST"
            onChange={handleCategoryValue}
            value={1 << 7}
            type="checkbox"
            checked={categoryChecked.WST}
          />
          샌드위치-보조토핑
        </li>
      </ul>
      <ul>
        <li>
          <input
            name="CUP"
            onChange={handleCategoryValue}
            value={1 << 8}
            type="checkbox"
            checked={categoryChecked.CUP}
          />
          컵과일
        </li>
      </ul>
      <ul>
        <li>
          <input
            name="BEV"
            onChange={handleCategoryValue}
            value={1 << 4}
            type="checkbox"
            checked={categoryChecked.BEV}
          />
          음료
        </li>
      </ul>
    </div>
  );

  const priceSelector = (
    <div className="priceSelector">
      <input
        defaultChecked
        name="price"
        value={""}
        type="radio"
        onChange={handlePriceValue}
      />{" "}
      초기화
      <input
        name="price"
        value={"desc"}
        type="radio"
        onChange={handlePriceValue}
      />{" "}
      높은순
      <input
        name="price"
        value={"asc"}
        type="radio"
        onChange={handlePriceValue}
      />{" "}
      낮은순
    </div>
  );

  useEffect(() => {
    get();
  }, [params]);

  return (
    <>
      <h1>상품관리</h1>
      <h3>상품목록</h3>
      <hr />
      {popUp.pg_category && categorySelector}
      {popUp.pg_price && priceSelector}
      <table border={1}>
        <tr>
          <th id="pg_category" onClick={handlePopup}>
            품목
          </th>
          <th>상품코드</th>
          <th>상품명</th>
          <th id="pg_price" onClick={handlePopup}>
            금액
          </th>
          <th>수정/삭제</th>
        </tr>
        {productTr}
      </table>
      <div>
        <Pagination
          activePage={params.page}
          itemsCountPerPage={1}
          totalItemsCount={totalPage}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
      <div className="pg_Search">
        <input value={params.search} onChange={handleSearchValue} />
      </div>
    </>
  );
};

export default ProductGet;
