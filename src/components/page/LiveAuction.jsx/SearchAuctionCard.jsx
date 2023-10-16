import React from "react";
import LiveAuctionCard from "./LiveAuctionCard";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import SkeletonCard from "./SkeletonCard";
import axios from "axios";

function SearchAuctionCard() {
  const { search } = useParams();

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message,setMessage] = useState();

  const url = new URL(window.location.href);

  console.log('Search ki ma ka bosra ',search)
  const getData = () => {
    let endpoint = null;
    endpoint = import.meta.env.APP_API_BASE_URL + '/search-auctions?query=' + search;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAuctions(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }
  useEffect(() => {
    getData();
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
            {loading ? (
              // Render skeleton loader when loading is true
              <>
                <div className="col-lg-4 col-md-6 col-sm-10">
                  <SkeletonCard />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-10">
                  <SkeletonCard />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-10">
                  <SkeletonCard />
                </div>
              </>
            ) : (
              // Render LiveAuctionCard when loading is false
             auctions.length>0? (
              auctions.map(auction => (
                <div key={auction.id} className="col-lg-4 col-md-6 col-sm-10">
                  <LiveAuctionCard
                    image={auction.product.image_urls[0]}
                    price={auction?.product?.start_price}
                    title={auction?.product?.title}
                    id={auction?.id}
                    startTime={auction?.start_time}
                    endTime={auction?.end_time}
                    status={auction?.dynamic_status}
                    isPaused={auction?.status}
                  />
                </div>
              )
             )
             ):(
              <div className="col-12">
                <p>No data found</p>
              </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchAuctionCard;
