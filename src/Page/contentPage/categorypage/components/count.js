import React, {useState} from 'react'
import "../styles/count.css"
const Count = () => {
    const [count, setCount] = useState(0)

    const plusCount = () => {
        setCount(count + 1);
    };
    const minusCount = () => {
        if (count > 0){
            setCount(count - 1);
    };
};
  return (
    <div className='count-button'>
        <button onClick={minusCount}>-</button>
        <span>{count}</span>
        <button onClick={plusCount}>+</button>
    </div>
  )
}

export default Count