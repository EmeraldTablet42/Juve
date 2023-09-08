import React, { useEffect, useState } from "react";
import Menupage from "./menupage";
import axios from "axios";
import { useSelector } from "react-redux";

const Juice = () => {
  const [juiceData, setJuiceData] = useState([]);
  const fitRecom = useSelector((state) => state.recom);

  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products;

      // BEV 카테고리의 제품만 필터링
      const juiceProducts = allProduct.filter(
        (product) => product.category === "BEV"
      );

      if (fitRecom.length > 0) {
        // fitRecom 배열 내에서 juiceProducts 배열에 존재하는 제품만 필터링
        let juiceRecom = fitRecom.filter((item) =>
          juiceProducts.some(
            (product) => product.productCode === item.JPR_PRODUCTCODE
          )
        );

        if (juiceRecom.length > 0) {
          // juiceRecom 배열 내에서 최대 TOTALSCORE 값을 찾는다.
          let maxFitScore = Math.max(
            ...juiceRecom.map((item) => item.TOTALSCORE)
          );

          // 최대 TOTALSCORE 값을 가진 항목을 찾는다.
          let productWithMaxFitScore = juiceRecom.find(
            (item) => item.TOTALSCORE === maxFitScore
          );

          // 해당 제품을 찾아서 " [맞춤상품]" 텍스트를 추가한다.
          if (productWithMaxFitScore) {
            for (let product of juiceProducts) {
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

      setJuiceData(juiceProducts);
    });
  }, []);

  return <Menupage productData={juiceData} />;
};

export default Juice;
