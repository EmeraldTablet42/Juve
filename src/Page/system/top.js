import React, { useState, useEffect} from 'react'
import "../css/topscroll.css"

const Top = () => {
    const [showButton, setShowbutton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}
    useEffect(() => {
        const showButtonClick = () => {
            if (window.scrollY > 200) {
                setShowbutton(true)
            } else {
                setShowbutton(false)
            }
        }
        window.addEventListener("scroll", showButtonClick)
        return () => {
            window.removeEventListener("scroll", showButtonClick)
        }
    }, [])
    return(
        showButton &&(
            <div className='scroll'>
                <button id="top" onClick={scrollToTop} type='button'>Top</button>
            </div>
        )
    )
}


export default Top