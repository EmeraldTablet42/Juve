import React, { useState } from "react";
import "../styles/count.css";

const Count = ({ count, setCount }) => {
  return (
    <div>
      <div style={{alignItems:"end"}}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
};

export default Count;
