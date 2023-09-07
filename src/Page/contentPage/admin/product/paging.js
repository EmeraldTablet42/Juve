import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import "./paging.css"

const Paging = () => {
    const [page, setPage] = useState(1);
    const handlePageChange = (page) => { 
        setPage(page);
        console.log(page);
     }
  return (
    <div>
    <Pagination
    activePage={page}
    itemsCountPerPage={1}
    totalItemsCount={450}
    pageRangeDisplayed={5}
    prevPageText={"‹"}
    nextPageText={"›"}
    onChange={handlePageChange}
    />        
    </div>
  )
}

export default Paging