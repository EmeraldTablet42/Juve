import React, { useState } from 'react';
import axios from 'axios';
const Saldetail = () => {
  const [salData, setSalData] = useState([]);
  const [sdrData, setSdrData] = useState([]);
  const [smtData, setSmtData] = useState([]);
  const [sstData, setSstData] = useState([]);
  const [ssmData, setSsmData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/product.get').then((res) => {
      const allProduct = res.data.products;
      const sFilterData = allProduct.filter(
        (product) => product.category === 'SAL'
      );
      setSalData(sFilterData);
      const sdFilterData = allProduct.filter(
        (product) => product.category === 'SDR'
      );
      setSdrData(sdFilterData);
      const smFilterData = allProduct.filter(
        (product) => product.category === 'SMT'
      );
      setSmtData(smFilterData);
      const sstFilterData = allProduct.filter(
        (product) => product.category === 'SST'
      );
      setSstData(sstFilterData);
      const ssmFilterData = allProduct.filter(
        (product) => product.category === 'SSM'
      );
      setSsmData(ssmFilterData);
    });
  }, []);
  const handleSdrChange = () => {};

  return (
    <div className="saldetail-wrapper">
      <div className="saldetail-image">
        <img
          src={`http://localhost:8090/product/photo/${detailData.productPhoto}`}
          alt="상품 이미지"
          style={{ width: '500px' }}
        />
      </div>
      <div className="sdrOption">
        <select onChange={handleSdrChange}>
          <option value="">옵션을 선택하세요</option>
          {sdrData.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Saldetail;
