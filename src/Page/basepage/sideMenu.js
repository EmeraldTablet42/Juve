import React from 'react'
import Top from '../system/top'
import "../css/sidemenu.css"
const SideMenu = () => {
  return (
    <div className='sidmenu'>
    <div className='sidemenu-object'>
        <button>주문조회</button>
        <button>장바구니</button>
        <button>최근 본 상품</button>
        <button>최근1</button>
        <button>최근2</button>
    </div>
    <div className='sidemenu-top'>
      <Top />
    </div>
    </div>
  )
}

export default SideMenu