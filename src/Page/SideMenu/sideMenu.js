import React from 'react'
import Top from '../system/top'

const SideMenu = () => {
  return (
    <table id='sideMenu' border={1}>
        <tr>
            <td>주문조회</td>
        </tr>
        <tr>
            <td>장바구니</td>
        </tr>
        <tr>
            <td>최근 본 상품</td>
        </tr>
        <tr>
            <td>최근1</td>
        </tr>
        <tr>
            <td>최근2</td>
        </tr>
        <tr>
            <td><Top /></td>
        </tr>

    </table>
  )
}

export default SideMenu