import React from "react";
import Pagination from "../../common/Pagination";
import LiveAuctionCard from "./LiveAuctionCard";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from '../../../config'
import { useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

function LiveAuctionWrap() {
  const [auctions, setAuctions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const url = new URL(window.location.href);

  const navigate = useNavigate();

  const getData = () => {
    let endpoint = null;

    let status = url.searchParams.get('status') ? url.searchParams.get('status') : 'live';

    if (url.searchParams.get('category')) {
      endpoint = BASE_URL + '/categories/' + url.searchParams.get('category') + `/auctions?status=${status}&page=${url.searchParams.get('page') ? url.searchParams.get('page') : 1}`;
    } else {
      endpoint = BASE_URL + `/auctions?status=${status}&page=${url.searchParams.get('page') ? url.searchParams.get('page') : 1}`;
    }

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAuctions(data.data);
        setPagination({
          current: data.current_page - 1,
          total: data.last_page,
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handlePageChange = (pageNo) => {
    url.searchParams.set('page', pageNo);
    navigate(url.search);
    getData();
  }


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
              ))
            )}
          </div>
          <Pagination
            onPageChange={handlePageChange}
            pagination={pagination}
          />
        </div>
      </div>
    </>
  );
}

export default LiveAuctionWrap;
