import React from 'react'
import sampleimage from "../imagefile/topbutton.png"
import Background from './background'
const Top = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}
    return(
        <div className='scroll'>
            <button id="top" onClick={scrollToTop} type='button' style={{border:"none",backgroundColor:"transparent"}}>
                <img src={sampleimage} alt="top" style={{width:"65px"}}></img>
            </button>
        </div>
    )
}


export default Top