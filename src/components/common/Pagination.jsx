import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

function Pagination({ onPageChange, pagination }) {
  const handlePageClick = (e) => {
    if (onPageChange) {
      onPageChange(e.selected + 1);
    }
  }

  return (
    <>
      <div className="row">
        <nav className="pagination-wrap">
          <ul className="pagination d-flex justify-content-center gap-md-3 gap-2">
            <ReactPaginate
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pagination.total}
              initialPage={pagination.current}
              previousLabel="Prev"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination d-flex justify-content-center gap-md-3 gap-2"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </ul>
        </nav>
      </div>   
    </>
  )
}

export default Pagination