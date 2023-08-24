import React, { useEffect, useState } from 'react'
import Menupage from './menupage'
import axios from 'axios'
const Fruit = () => {
  const [fruitData, setFruitData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products; 
      const filterData = allProduct.filter(product => product.category === "CUP");
      setFruitData(filterData)
    });
  }, []);

  return (
    <Menupage productData={fruitData}/>
  )
}

export default Fruit
