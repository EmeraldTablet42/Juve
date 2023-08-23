
import React, { useState } from "react";

const Test = () => {
  const productDB = [
    {
      category: "SAL",
      productNum: "01",
      productName: "골라담는 샐러드",
      price: 4500,
    },
    { category: "SMT", productNum: "01", productName: "목살", price: 4500 },
    { category: "SMT", productNum: "02", productName: "오리", price: 4500 },
    { category: "SD", productNum: "01", productName: "오리엔탈", price: 4500 },
    { category: "SD", productNum: "02", productName: "발사믹", price: 4500 },
    { category: "SST", productNum: "01", productName: "사이즈업", price: 1500 },
    { category: "SST", productNum: "02", productName: "견과류", price: 1000 },
    { category: "SSM", productNum: "01", productName: "베이글", price: 1500 },
    { category: "SSM", productNum: "01", productName: "또띠아", price: 800 },
  ];

  const [productOption, setProductOption] = useState({
    salOp: "",
    sdOp: "",
    smtOp: [],
    sstOp: [],
    ssmOp: [],
    totalPrice: 0,
  });

  const optionHandle = (e) => {
    if (e.target.type === "checkbox") {
      //   alert("체크박스입니다");
      if (e.target.checked) {
        // alert("체크됨");
        // alert(e.target.dataset.price);
        setProductOption((preState) => ({
          ...preState,
          [e.target.name]: [...preState[e.target.name], e.target.value],
          totalPrice: preState.totalPrice + Number(e.target.dataset.price),
        }));
      } else {
        // alert("체크안됨");
        setProductOption((preState) => ({
          ...preState,
          [e.target.name]: [
            ...preState[e.target.name].filter(
              (item) => item !== e.target.value
            ),
          ],
          totalPrice: preState.totalPrice - Number(e.target.dataset.price),
        }));
      }
    } else {
      setProductOption({
        ...productOption,
        [e.target.name]: e.target.value,
      });
    }
  };

  const salOp = productDB
    .filter((item) => item.category === "SAL")
    .map((item) => (
      <option data-price={item.price} value={item.name} key={item.category}>
        {item.productName}
      </option>
    ));
  const sdOp = productDB
    .filter((item) => item.category === "SD")
    .map((item) => (
      <option data-price={item.price} value={item.name} key={item.category}>
        {item.productName}
      </option>
    ));

  const smtOp = productDB
    .filter((item) => item.category === "SMT")
    .map((item) => (
      <span>
        <input
          name="smtOp"
          type="checkbox"
          value={item.productName}
          data-price={item.price}
          onChange={optionHandle}
        />
        {item.productName}
      </span>
    ));
  const sstOp = productDB
    .filter((item) => item.category === "SST")
    .map((item) => (
      <span>
        <input
          name="sstOp"
          type="checkbox"
          value={item.productName}
          data-price={item.price}
          onChange={optionHandle}
        />
        {item.productName}
      </span>
    ));
  const ssmOp = productDB
    .filter((item) => item.category === "SSM")
    .map((item) => (
      <span>
        <input
          name="ssmOp"
          type="checkbox"
          value={item.productName}
          data-price={item.price}
          onChange={optionHandle}
        />
        {item.productName}
      </span>
    ));

  const show = () => {
    alert(JSON.stringify(productOption));
  };
  return (
    <>
      <h1> test</h1>
      <select name="salOp" onChange={optionHandle}>
        <option>샐러드 종류 선택</option>
        {salOp}
      </select>
      <hr />
      <select name="sdOp" onChange={optionHandle}>
        <option>샐러드 드레싱 선택</option>
        {sdOp}
      </select>
      <hr />
      {smtOp}
      <hr />
      {sstOp}
      <hr />
      {ssmOp}
      <hr />
      <button onClick={show}>담기</button>
      <div>
        <h1>총 가격 : {productOption.totalPrice}</h1>
      </div>
    </>
  );
};

export default Test;
