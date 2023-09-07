// CodeToNameConverter.js
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProductCodeToName } from "./codeToNameSlice";

const CodeToNameConverter = () => {
  const myDispatch = useDispatch();
  useEffect(() => {
    // alert("통신중");
    axios
      .get("http://localhost:8090/product.get")
      .then((res) => {
        const productData = res.data.products;
        // alert(JSON.stringify(productData ))
        const updatedProductCodeToName = {};
        productData.forEach((product) => {
            // alert(JSON.stringify(product.productCode));
          updatedProductCodeToName[product.productCode] = product.productName;
        });
        // alert(JSON.stringify(updatedProductCodeToName)); 
        myDispatch(setProductCodeToName(updatedProductCodeToName));
      })
      .catch(() => {
        console.error("DB통신에러");
      });
  }, [myDispatch]);

  return null;
};

export default CodeToNameConverter;
