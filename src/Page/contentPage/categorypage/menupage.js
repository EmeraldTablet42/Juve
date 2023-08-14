/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "../../css/menu.css"
import "../../imagefile/orange.png"
import Thumbnail from '../../system/thumbnail'
const Menupage = () => {
  return (
    <div>
        <body id='bodytype'>
            <table border={0} style={{align:"center",width:"1600px", height:"800px",margin:"50px", borderSpacing:"60px"}}>
                <img src="../imagefile/orange.png"  style={{width:"1200px", height:"400px", margin:"20px"}} />
            </table>
            <table border={1} style={{borderCollapse: "separate" ,align:"center",width:"80%", height:"800px",margin:"50px", borderSpacing:"100px"}}>
                <tr style={{width:"300px"}}>
                    <td>
                        <Thumbnail />    
                    </td>
                    <td>
                        <Thumbnail />    
                    </td>
                    <td>
                        <Thumbnail />    
                    </td>
                </tr>
                <tr style={{width:"300px"}}>
                    <td>
                        <Thumbnail />    
                    </td>
                    <td>
                        <Thumbnail />    
                    </td>
                    <td>
                        <Thumbnail />    
                    </td>
                </tr>
            </table>
            
        </body>
    </div>
  )
}

export default Menupage