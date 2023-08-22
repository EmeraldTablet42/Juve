import React, {useState} from 'react'
import "../styles/count.css"

const Count = ({ count, setCount }) => {
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Count;