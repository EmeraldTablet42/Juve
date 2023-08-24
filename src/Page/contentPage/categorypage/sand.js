import React, { useEffect, useState } from 'react';
import Menupage from './menupage'
import axios from 'axios';

const Sand = () => {
    const [sandData, setSandData] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8090/product.get").then((res) => {
        const allProduct = res.data.products; 
        const filterData = allProduct.filter(product => product.category === "WIH");
        setSandData(filterData)
      });
    }, []);
  
    return (
      <Menupage productData={sandData}/>
    )
  }

export default Sand