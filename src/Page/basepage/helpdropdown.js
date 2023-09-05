import React, { useState } from 'react'
import "./helpdropdown.css"
const Helpdropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdown =() => {
        setIsOpen(!isOpen);
    }
  return (
    <div className="help-dropdown" onMouseEnter={dropdown} onMouseLeave={dropdown}>
            <button className="dropdown-btn">고객센터▼ </button>
            {isOpen && (
              <div className="dropdown-content">
                <a href="/board/notice/list">공지사항</a>
                <a href="/board/consult/list">문의게시판</a>
              </div>
            )}
          </div>
  )
}

export default Helpdropdown