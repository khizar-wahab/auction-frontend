import React, { useEffect, useRef, useState } from 'react'
import Counter from '../../common/Counter'
import { BASE_URL } from '../../../config'
import Skeleton from "react-loading-skeleton";

import moment from 'moment';
import { Link } from 'react-router-dom';

function AuctionDetailsInfo({ auction, onBid, onCurrentPriceChange }) {
  const token = localStorage.getItem('token');
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    auction_id: '',
    amount: '',
    product_id: '',
  });
  const [currentPrice, setCurrentPrice] = useState(auction.current_bid);

  let currentPriceUpdateInterval = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.auction_id = auction?.id;
    formData.product_id = auction?.product?.id;
    try {
      const response = await fetch(BASE_URL + '/bids', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status == true) {
          setFormData({
            ...formData,
            amount: '',
          });
          setSuccessMsg('Bid placed.')
          setErrorMsg(null)
          if (onBid) {
            onBid();
          }
        } else {
          setErrorMsg(data.message)
          setSuccessMsg(null)
        }

      } else {

      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const startUpdatingCurrentPrice = () => {
    let requestExists = false;

    currentPriceUpdateInterval.current = setInterval(async () => {
      if (requestExists) return;

      requestExists = true;
      const res = await fetch(`${BASE_URL}/auctions/${auction.id}/current-price`, { method: 'GET' });
      if (!res.ok) {
        console.log("Failed to fetch current price");
      }
      else {
        const newPrice = (await res.json()).data;
        if (newPrice > currentPrice && onCurrentPriceChange) {
          onCurrentPriceChange(); // Fire event
        }
        setCurrentPrice(newPrice);
      }
      requestExists = false;
    }, 3000);
  }

  useEffect(() => {
    startUpdatingCurrentPrice();

    return () => {
      clearInterval(currentPriceUpdateInterval.current);
    }
  });

  return (
    <>
        <div className="row g-4 mb-50">
          <div className="col-xl-6 col-lg-7 d-flex flex-row align-items-start justify-content-lg-start justify-content-center flex-md-nowrap flex-wrap gap-4">


            <ul className="nav small-image-list d-flex flex-md-column flex-row justify-content-center gap-4  wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".4s">

              {auction?.product?.image_urls.map((imageUrl, index) => (
                <li className="nav-item" key={index}>
                  <div
                    id={`details-img-preview${index + 1}`}
                    data-bs-toggle="pill"
                    data-bs-target={`#gallery-img${index + 1}`}
                    aria-controls={`gallery-img-preview${index + 1}`}
                  >
                    <img alt={`imag-${index}`} src={imageUrl} className="img-fluid" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tab-content mb-4 d-flex justify-content-lg-start justify-content-center  wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".4s">

              {auction?.product?.image_urls.map((imageUrl, index) => (
                <div key={index} className={`tab-pane big-image fade ${(index + 1) == 1 ? 'show active' : ''}`} id={`gallery-img${index + 1}`}>
                  <div className={`auction-gallery-timer d-flex align-items-center justify-content-center ${(index + 1) == 1 ? 'flex-wrap' : ''}`}>
                    <h3 id={`countdown-timer-${index + 1}`}>
                    {
                     auction.status == 1 ? (
                      auction.dynamic_status !== 'won' ? (
                        <Counter countDownDate={(
                          auction.dynamic_status === 'live' ?
                            moment(auction.end_time).format('MMM DD, YYYY, HH:mm:ss') :
                            moment(auction.start_time).format('MMM DD, YYYY, HH:mm:ss')
                        )} />
                      ) : (
                        <span>SOLD</span>
                      )
                      ) : (
                        <span>Paused</span>
                      )
                    }
                    </h3>
                  </div>
                  <img alt="images" src={imageUrl} className="img-fluid" style={{ maxWidth: "444px" }} />
                </div>
              ))}
            </div>
          </div>
      
          <div className="col-xl-6 col-lg-5">
            <div className="product-details-right  wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
              <h3>{auction?.product?.title}</h3>
              <p className="para">{auction?.product?.brief}</p>
              <h4>Current Bid: {currentPrice !== null && (<span>${currentPrice}</span>)}</h4>
              {
              auction.status == 1 ? (
              auction.dynamic_status === 'live' && (
                <div className="bid-form">
                  <div className="form-title">
                    <h5>Bid Now</h5>
                    <p>Bid Amount : Minimum Bid {currentPrice !== null && (`$${currentPrice}`)}</p>
                  </div>
                  {
                    successMsg ?
                      <span className='text-success'>{successMsg}</span>
                      :
                      ''
                  }
                  {
                    errorMsg ?
                      <span className='text-danger'>{errorMsg}</span>
                      :
                      ''
                  }
                  {localStorage.getItem('isLoggedIn') === 'true' ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-inner gap-2">
                        <input type="text" placeholder="$00.00" name='amount' value={formData.amount} onChange={handleInputChange} />
                        <button className="eg-btn btn--primary btn--sm" type="submit">Place Bid</button>
                      </div>
                    </form>
                  ) : (
                    <Link to="/login" className="eg-btn btn--primary btn--sm">Bid Now</Link>
                  )}
                </div>
              )
              ) : (
                <div></div>
              )
            }
            </div>
          </div>

        </div>
    </>
  )
}

export default AuctionDetailsInfo


