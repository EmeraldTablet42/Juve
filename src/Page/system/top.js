import React from 'react'

const Top = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}
    return(
        <div className='scroll'>
            <button id="top" onClick={scrollToTop} type='button'  style={{width:"80px"}}>Top</button>
        </div>
    )
}


export default Top