import React, { useEffect, useState } from "react";
import Menupage from "./menupage";
import axios from "axios";
import { useSelector } from "react-redux";

const Fruit = () => {
  const [fruitData, setFruitData] = useState([]);
  const fitRecom = useSelector((state) => state.recom);

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;

      // CUP 카테고리의 제품만 필터링
      const cupProducts = allProduct.filter(
        (product) => product.category === "CUP"
      );

      const allRecom = [
        // ... allRecom 배열의 데이터 ...
      ];

      if (allRecom.length > 0) {
        let maxAllScore = Math.max(...allRecom.map((item) => item.TOTALSCORE));
        let productWithMaxAllScore = allRecom.find(
          (item) =>
            item.TOTALSCORE === maxAllScore &&
            cupProducts.some(
              (product) => product.productCode === item.JPR_PRODUCTCODE
            )
        );

        if (productWithMaxAllScore) {
          for (let product of cupProducts) {
            if (
              product.productCode === productWithMaxAllScore.JPR_PRODUCTCODE
            ) {
              product.productName += " [인기상품]";
              break;
            }
          }
        }
      }

      if (fitRecom.length > 0) {
        let cupRecom = fitRecom.filter((item) =>
          cupProducts.some(
            (product) => product.productCode === item.JPR_PRODUCTCODE
          )
        );

        if (cupRecom.length > 0) {
          let maxFitScore = Math.max(
            ...cupRecom.map((item) => item.TOTALSCORE)
          );
          console.log("Max Fit Score:", maxFitScore);
          let productWithMaxFitScore = cupRecom.find(
            (item) => item.TOTALSCORE === maxFitScore
          );

          // alert(JSON.stringify(productWithMaxFitScore));

          if (productWithMaxFitScore) {
            for (let product of cupProducts) {
              if (
                product.productCode === productWithMaxFitScore.JPR_PRODUCTCODE
              ) {
                // alert(product.productName);
                product.productName += " [맞춤상품]";
                break;
              }
            }
          }
        }
      }

      console.log("CUP Products:", cupProducts);
      setFruitData(cupProducts);
    });
  }, []);

  return <Menupage productData={fruitData} />;
};

export default Fruit;
