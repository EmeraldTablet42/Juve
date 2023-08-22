import React, {useRef} from 'react'

const Usemove = () => {
    const element = useRef<HTMLDivElement>(null);
    const onMoveToElement = () => {
        element.current?.scroll
    }
  return (
    <div>


    </div>
  )
}

export default Usemove