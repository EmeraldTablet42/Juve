import React, { useEffect, useState } from 'react';
import Menupage from './menupage'
import axios from 'axios';

const Juice = () => {
  const [juiceData, setJuiceData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      const allProduct = res.data.products; 
      const filterData = allProduct.filter(product => product.category === "BEV");
      setJuiceData(filterData)
    });
  }, []);
  

  return (
    <Menupage productData={juiceData}/>
  )
}

export default Juice
