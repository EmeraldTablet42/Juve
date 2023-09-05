import React from 'react'
import sampleimage from "../imagefile/topbutton.png"
const Top = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}
    return(
        <div className='scroll'>
            <button id="top" onClick={scrollToTop} type='button'>
                <img src={sampleimage} alt="top" style={{width:"65px",backgroundColor: "rgba(255, 255, 255, 0)"}}></img>
            </button>
        </div>
    )
}


export default Top