

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import axios from 'axios';


function ContentOfpurchase() {
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(null);
  const [filterOption, setFilterOption] = useState(null);

  useEffect(() => {
    const getPurchases = import.meta.env.APP_API_BASE_URL + '/purchase-order' + (filterOption ? `?limit=${filterOption}` : ``);
    const token = localStorage.getItem('token');
    fetch(getPurchases, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPurchases(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }, [filterOption]);

  // useEffect(() => {
  //   const filteredPurchases = filterPurchasesByOption(purchases, filterOption);
  //   setPurchases(filteredPurchases);
  // }, [filterOption]);

  // const filterPurchasesByOption = (purchases, option) => {
  //   // Implement your filtering logic based on the selected option
  //   switch (option) {
  //     case "02":
  //       return purchases.slice(0, 3);
  //     case "03":
  //       return purchases.slice(0, 15);
  //     case "04":
  //       return purchases.slice(0, 20);
  //     default:
  //       return purchases.slice(0, 5);
  //   }
  // };

  const makePayment = async (purchasePrice, orderID) => {
    try {
      setIsLoading(orderID);
      const response = await axios.post(import.meta.env.APP_API_BASE_URL + '/paypal-charge', {
        amount: purchasePrice,
        order_id: orderID,
      }, {
        headers: {
          Referer: 'no-referer-when-downgraded',
        }
      });
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="tab-pane fade" id="v-pills-purchase" role="tabpanel" aria-labelledby="v-pills-purchase-tab">
        <div className="table-title-area">
          <h3>All Purchase</h3>
          <select
            className='p-2 border rounded'
            id="order-category"
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value={5}>Show: Last 05 Order</option>
            <option value={3}>Show: Last 03 Order</option>
            <option value={15}>Show: Last 15 Order</option>
            <option value={20}>Show: Last 20 Order</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table className="eg-table order-table table mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Bidding ID</th>
                <th>Bid Amount(USD)</th>
                <th>Image</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(purchase => (
                <tr key={purchase.id}>
                  <td data-label="Title">{purchase.title}</td>
                  <td data-label="Bidding ID">{purchase.id}</td>
                  <td data-label="Bid Amount(USD)">{purchase.price}</td>
                  <td data-label="Image"> {purchase.product.image ? (
                    <img alt="dashboardImage" src={purchase.product.image} className="img-fluid" />
                  ) : (
                    <div>Image not available</div>
                  )}</td>

                  <td data-label="Status" className="text-green">{purchase.status}</td>
                  <td>
                    {isLoading === purchase.id ? (
                      <div className="spinner"></div>
                    ) : (
                      !purchase.is_paid ? (
                        <button className='eg-btn btn--primary btn--sm' onClick={() => makePayment(purchase.price, purchase.id)}>
                          Make Payment
                        </button>
                      ) : (
                        <span className="text-green">Paid</span>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-pagination">
          <p>{`Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, purchases.length)} of ${purchases.length} entries`}</p>
          <nav className="pagination-wrap">
            <ul className="pagination style-two d-flex justify-content-center gap-md-3 gap-2">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>Prev</Link>
              </li>
              {Array.from({ length: Math.ceil(purchases.length / itemsPerPage) }, (item, index) => (
                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                  <Link className="page-link" to="#" onClick={() => paginate(index + 1)}>{index + 1}</Link>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(purchases.length / itemsPerPage) ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>Next</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default ContentOfpurchase;
