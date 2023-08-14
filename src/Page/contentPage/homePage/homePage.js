import React from 'react'

const HomePage = () => {
  return (
    <>
    <div id='bxSlider'>
        bx슬라이더
    </div>
    <table id='recomMenu' border={1}>
        <tr>
            <td colSpan={3} align='center'>대표 메뉴</td>
        </tr>
        <tr>
            <td>골라담는 샐러드</td>
            <td>파스타 샐러드</td>
            <td>하와이안 포케샐러드</td>
        </tr>
        <tr>
            <td colSpan={3} align='center'><button>전체 메뉴 보기</button></td>
        </tr>
    </table>
    </>
  )
}

export default HomePage