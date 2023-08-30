import { useRef } from 'react'

const Movescroll = () => {
    const element = useRef();
    
    const moveToElement = () => {
      if (element.current) {
          element.current.scrollIntoView({ behavior: 'smooth' });
      }
  };
  return {element, moveToElement};
}

export default Movescroll
