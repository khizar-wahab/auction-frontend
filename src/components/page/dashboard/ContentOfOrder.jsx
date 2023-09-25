
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { orderListOptions } from '../../../data/data';
import { BASE_URL } from '../../../config';

function ContentOfOrder() {
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#EEEEEE',
      padding: 0,
      '&:hover': { borderColor: '#32c36c' },
      boxShadow: state.isFocused ? null : null,
    }),
  };

  const [biddings, setBiddings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const getBidding = `${BASE_URL}/order-biding${selectedFilter ? `?limit=${selectedFilter}` : ''}`;
    const token = localStorage.getItem('token');
    fetch(getBidding, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBiddings(data.data);
      })
      .catch((error) => {
        console.error('Failed:', error);
      });
  }, [selectedFilter]);

  const entriesPerPage = 10;
  const endIndex = currentPage * entriesPerPage;
  const startIndex = endIndex - entriesPerPage;

  const currentEntries = biddings.slice(startIndex, endIndex);

  return (
    <>
      <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
        <div className="table-title-area">
          <h3>Order Bidding List</h3>
          {/* <Select placeholder="filter order" valueContainer="select" options={orderListOptions} styles={customStyle} /> */}
          <Select
            placeholder="Filter order"
            value={orderListOptions.find(option => option.value === selectedFilter)}
            onChange={(option) => setSelectedFilter(option.value)}
            options={orderListOptions}
            styles={customStyle}
          />
        </div>
        <div className="table-wrapper">
          <table className="eg-table order-table table mb-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Bidding ID</th>
                <th>Bid Amount(USD)</th>
                <th>Highest Bid</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((bidding) => (
                <tr key={bidding.id}>
                  <td data-label="Image">
                    {bidding.product.image ? (
                      <img alt="dashboardImage" src={bidding.product.image} className="img-fluid" />
                    ) : (
                      <div>Image not available</div>
                    )}
                  </td>
                  <td data-label="Bidding ID">{bidding.id}</td>
                  <td data-label="Bid Amount(USD)">${bidding.amount}</td>
                  <td data-label="Highest Bid">${bidding.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <p>Showing {startIndex + 1} to {Math.min(endIndex, biddings.length)} of {biddings.length} entries</p>
          <nav className="pagination-wrap">
            <ul className="pagination style-two d-flex justify-content-center gap-md-3 gap-2">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" tabIndex={-1} onClick={() => setCurrentPage(currentPage - 1)}>
                  Prev
                </Link>
              </li>
              {Array.from({ length: Math.ceil(biddings.length / entriesPerPage) }, (_, index) => (
                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                  <Link className="page-link" to="#" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === Math.ceil(biddings.length / entriesPerPage) ? 'disabled' : ''
                  }`}
              >
                <Link className="page-link" to="#" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default ContentOfOrder;
