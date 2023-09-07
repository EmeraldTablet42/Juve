import React from 'react'
import { Link } from 'react-router-dom'
import AdminAreaRoutes from './adminAreaRoutes'
import "../myPage/myPage.css"

const AdminPage = () => {
  return (
    <>
     <div className="myPage_layout">
        <div className="myPage_left">
          <ul className='left-ul' style={{listStyle:"none"}}>
            <li><Link to="/admin/order">주문 관리</Link></li>
            <li><Link to="/admin/product">상품 관리</Link></li>
            <li><Link to="/admin/sales">매출 관리</Link></li>
            <li><Link to="/admin/price">물가 정보</Link></li>
          </ul>
        </div>
        <div className="myPageContentArea">
            <AdminAreaRoutes/>
        </div>
      </div>
    </>
  )
}

export default AdminPage