import React from 'react';
import how1 from './static/how1.png';
import how2 from './static/how2.png';
const How = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '200px',
      }}
    >
      <img src={how1} alt="주문방법" />
      <img src={how2} alt="주문방법" />
    </div>
  );
};

export default How;
