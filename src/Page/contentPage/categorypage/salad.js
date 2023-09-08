import React, { useEffect, useState } from "react";
import Menupage from "./menupage";
import axios from "axios";
import { useSelector } from "react-redux";

const Salad = () => {
  const [saladData, setSaladData] = useState([]);
  const fitRecom = useSelector((state) => state.recom);

  useEffect(() => {
    // alert(JSON.stringify(fitRecom));
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;

      // SAL 카테고리의 제품만 필터링
      const saladProducts = allProduct.filter(
        (product) => product.category === "SAL"
      );

      if (fitRecom.length > 0) {
        // fitRecom 배열 내에서 saladProducts 배열에 존재하는 제품만 필터링
        let saladRecom = fitRecom.filter((item) =>
          saladProducts.some(
            (product) => product.productCode === item.JPR_PRODUCTCODE
          )
        );

        if (saladRecom.length > 0) {
          // saladRecom 배열 내에서 최대 TOTALSCORE 값을 찾는다.
          let maxFitScore = Math.max(
            ...saladRecom.map((item) => item.TOTALSCORE)
          );

          // 최대 TOTALSCORE 값을 가진 항목을 찾는다.
          let productWithMaxFitScore = saladRecom.find(
            (item) => item.TOTALSCORE === maxFitScore
          );

          // 해당 제품을 찾아서 " [맞춤상품]" 텍스트를 추가한다.
          if (productWithMaxFitScore) {
            for (let product of saladProducts) {
              if (
                product.productCode === productWithMaxFitScore.JPR_PRODUCTCODE
              ) {
                product.productName += " [맞춤상품]";
                break;
              }
            }
          }
        }
      }

      setSaladData(saladProducts);
    });
  }, []);

  return <Menupage productData={saladData} />;
};

export default Salad;
