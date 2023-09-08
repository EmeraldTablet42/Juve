import React, { useEffect, useState } from "react";
import Menupage from "./menupage";
import axios from "axios";
import { useSelector } from "react-redux";

const Sand = () => {
  const [sandData, setSandData] = useState([]);
  const fitRecom = useSelector((state) => state.recom);

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;

      // WIH 카테고리의 제품만 필터링
      const sandProducts = allProduct.filter(
        (product) => product.category === "WIH"
      );

      if (fitRecom.length > 0) {
        // fitRecom 배열 내에서 sandProducts 배열에 존재하는 제품만 필터링
        let sandRecom = fitRecom.filter((item) =>
          sandProducts.some(
            (product) => product.productCode === item.JPR_PRODUCTCODE
          )
        );

        if (sandRecom.length > 0) {
          // sandRecom 배열 내에서 최대 TOTALSCORE 값을 찾는다.
          let maxFitScore = Math.max(
            ...sandRecom.map((item) => item.TOTALSCORE)
          );

          // 최대 TOTALSCORE 값을 가진 항목을 찾는다.
          let productWithMaxFitScore = sandRecom.find(
            (item) => item.TOTALSCORE === maxFitScore
          );

          // 해당 제품을 찾아서 " [맞춤상품]" 텍스트를 추가한다.
          if (productWithMaxFitScore) {
            for (let product of sandProducts) {
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

      setSandData(sandProducts);
    });
  }, []);

  return <Menupage productData={sandData} />;
};

export default Sand;
