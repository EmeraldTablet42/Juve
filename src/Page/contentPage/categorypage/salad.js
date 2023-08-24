import React, { useEffect, useState } from 'react';
import Menupage from './menupage'
import axios from 'axios';

const Salad = () => {
    const [saladData, setSaladData] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8090/product.get").then((res) => {
        const allProduct = res.data.products; 
        const filterData = allProduct.filter(product => product.category === "SAL");
        setSaladData(filterData)
      });
    }, []);
  
    return (
      <Menupage productData={saladData}/>
    )
  }

export default Salad