import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../../../config'
import BuyBidCard from './BuyBidCard'

function BuyBidWrapper() {
  const [bids, setBids] = useState([]);
  useEffect(() => {
    const getBids = import.meta.env.APP_API_BASE_URL+'/get-bids';
    fetch(getBids, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBids(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }, []);
  return (
    <>
      <div className="live-auction-section pt-120 pb-120">
        <img
          alt="images"
          src={"/images/bg/section-bg.png"}
          class="img-fluid section-bg-top"
        />
        <img
          alt="images"
          src={"/images/bg/section-bg.png"}
          class="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row gy-4 mb-60 d-flex justify-content-center">
            {bids.map(bid => (
              <div key={bid.id} className="col-lg-4 col-md-6 col-sm-10">
                <BuyBidCard
                  image={bid.image}
                  price={bid?.price}
                  title={bid?.name}
                  id={bid?.id}
                  qty={bid?.quantity}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyBidWrapper