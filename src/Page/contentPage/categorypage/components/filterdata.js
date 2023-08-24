import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Filterdata = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8090/product.get").then((res) => {
            setAllData(res.data.products);
    });
    }, [])
    useEffect(()=>{
        const exclude = ["BEV","SAL", "WIH", "CUP"];
        const filteredProduct = allData.filter(product => !exclude.includes(product.category));
        setFilteredData(filteredProduct);
    }, [allData])
  return filteredData;
}

export default Filterdata