import React, { useState, useEffect } from 'react';
import AuctionDetailsInfo from './AuctionDetailsInfo'
import AuctionDetailsTab from './AuctionDetailsTab'
import { BASE_URL } from '../../../config'
import Skeleton from "react-loading-skeleton";


function AuctionDetailsWrap(props) {
  const [auction, setAuction] = useState(null);
  const [refreshBidHistory, setRefreshBidHistory] = useState(() => {
    return () => { }
  });

  useEffect(() => {
    const getAuction = import.meta.env.APP_API_BASE_URL + '/auctions/' + props.id;
    fetch(getAuction)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAuction(data.data);
        console.log('auction', auction)
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }, [props.id]);

  return (
    <>
      <div className="auction-details-section pt-120 pb-120">
        <img alt="images" src={'/images/bg/section-bg.png'} className="img-fluid section-bg-top" />
        <img alt="images" src={'/images/bg/section-bg.png'} className="img-fluid section-bg-bottom" />

        <div className="container">
          {auction !== null ? (
            <>
              <AuctionDetailsInfo auction={auction} onBid={() => refreshBidHistory()} onCurrentPriceChange={() => refreshBidHistory()} />
              <AuctionDetailsTab auction={auction} setRefreshBidHistory={setRefreshBidHistory} />
            </>
          ) : (
            <>
              <div className="row g-4 mb-50">
                <div className="col-xl-6 col-lg-7 d-flex flex-row align-items-start justify-content-lg-start justify-content-center flex-md-nowrap flex-wrap gap-4">


                  <ul className="nav small-image-list d-flex flex-md-column flex-row justify-content-center gap-4  wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".4s">

                    <Skeleton width={100} height={130} />
                    <Skeleton width={100} height={130} />
                    <Skeleton width={100} height={130} />

                  </ul>
                  <div className="tab-content mb-4 d-flex justify-content-lg-start justify-content-center  wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".4s">

                    <Skeleton width={444} height={354} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-5">
                  <div className="product-details-right  wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                    <h3><Skeleton width={180} height={30} /></h3>
                    <Skeleton width={450} height={15} />
                    <Skeleton width={450} height={15} />
                    <Skeleton width={450} height={15} />
                    <h4 className="mt-3"><Skeleton width={200} height={25} /></h4>

                    <div className="bid-form">
                      <div className="form-title">
                        <Skeleton width={80} height={30} />
                        <Skeleton width={200} height={15} />
                      </div>


                      <form>
                        <div className="form-inner gap-2">
                          <Skeleton width={450} height={50} />
                          <Skeleton width={120} height={50} />
                        </div>
                      </form>


                    </div>

                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AuctionDetailsWrap