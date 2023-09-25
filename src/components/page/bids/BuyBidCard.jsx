import React from "react";
import { Link } from "react-router-dom";
import {BASE_URL} from '../../../config'
import axios from 'axios';
function BuyBidCard(props) {
  
  const token = localStorage.getItem('token');
  const makePayment = async (price,id) => {
    try {
      const response = await axios.post(BASE_URL+'/buy-bids', {
        amount: price,
        id: id,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };
  return (
    <>
      <div
        data-wow-duration="1.5s"
        data-wow-delay="0.2s"
        className="eg-card auction-card1 wow fadeInDown"
      >
        <div className="auction-img">
          <img alt="images" src={` ${props.image}`} />
        </div>
        <div className="auction-content">
          <h4>
              {props.title}
          </h4>
          <p>
            Bids : <span>{props.qty}</span>
          </p>
          <p>Price : <span>${props.price}</span></p>
          <div className="auction-card-bttm">
            <button className='eg-btn btn--primary btn--sm' onClick={() => makePayment(props.price,props.id)}>
            Purchase Using Paypal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyBidCard;
