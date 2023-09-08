import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/favorite.css';
const MyFavorite = () => {
  const [allData, setAllData] = useState([]);
  const [favList, setFavList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navi = useNavigate();

  const getProductDB = () => {
    return axios.get('http://localhost:8090/product.get').then((res) => {
      return res.data.products;
    });
  };

  const getFavList = () => {
    return axios
      .get(
        `http://localhost:8090/member.get.favorites?token=${sessionStorage.getItem(
          'loginToken'
        )}`
      )
      .then((res) => {
        return res.data.favorites;
      });
  };

  const goProduct = (category, productCode) => {
    // ...
  };

  useEffect(() => {
    Promise.all([getFavList(), getProductDB()])
      .then(([favorites, products]) => {
        setFavList(favorites);
        setAllData(products);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('데이터 로딩 중 오류 발생:', error);
        setDataLoaded(true); // 에러가 발생하더라도 데이터 로딩 상태를 true로 설정
      });
  }, []);

  const favTr = favList.map((v, i) => {
    const productData = allData.find(
      (data) => data.productCode === v.productCode
    );
    const imageUrl = productData
      ? `http://localhost:8090/product/photo/${productData.productPhoto}`
      : '';
    return (
      <tr className="favTr" key={i}>
        <td>
          <img
            src={imageUrl}
            alt="상품이미지"
            style={{
              width: '150px',
              height: '150px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </td>
        <td>{productData.productName}</td>
        <td>{productData.productPrice}</td>
        <td>
          <button
            className="default-button"
            style={{ fontSize: '17pt', width: '60px', height: '40px' }}
            onClick={() => {
              goProduct(productData.category, productData.productCode);
            }}
          >
            이동
          </button>
        </td>
      </tr>
    );
  });

  return (
    dataLoaded && (
      <>
        <table className="favorite-table">
          <tr>
            <th>이미지</th>
            <th>상품정보</th>
            <th>판매가</th>
            <th>상품보러가기</th>
          </tr>
          {favTr}
        </table>
      </>
    )
  );
};

export default MyFavorite;
