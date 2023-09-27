import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import Skeleton from 'react-loading-skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LiveAuctionCard from '../LiveAuction.jsx/LiveAuctionCard';


function LiveAuctionHome1() {
  const [auctions, setAuctions] = useState([]);
  const [showApiCall, setShowApiCall] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = () => {
      const getAuctions = import.meta.env.APP_API_BASE_URL + '/auctions?limit=6&status=live';
      fetch(getAuctions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAuctions(data.data);
          console.log('auction live', data.data);
          setShowApiCall(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed:', error);
        });
    };
    fetchAuctions();
    const intervalId = setInterval(fetchAuctions, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const upcomingSlider = {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 24,
    loop: true,
    roundLengths: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: 'true',
    },
    navigation: {
      nextEl: '.coming-prev1',
      prevEl: '.coming-next1',
    },

    breakpoints: {
      280: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      },

    }
  }

  return (
    <>
    <div className='container'>
       <div className="live-auction pb-120">
        <img alt="images" src={"/images/bg/section-bg.png"} className="img-fluid section-bg" />
        <div className="container position-relative">
          <img alt="images" src={"/images/bg/dotted1.png"} className="dotted1" />
          <img alt="images" src={"/images/bg/dotted1.png"} className="dotted2" />
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <div className="section-title1">
                <h2>Live Auction</h2>
                <p className="mb-0">Explore on the world's best &amp; largest Bidding marketplace with our beautiful Bidding
                  products. We want to be a part of your smile, success and future growth.</p>
              </div>
            </div>
          </div>
        </div>  
        {loading ? (
          <div className="row d-flex justify-content-center">
            <Swiper {...upcomingSlider} className="swiper upcoming-slider">
              <div className="swiper-wrapper">
                {Array(3)
                  .fill(undefined)
                  .map((_, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                    < div className="c-feature-card1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                      <div className="skeleton-centered mt-0">
                        <Skeleton height={420} width={428} />
                      </div>
                      <div className="c-feature-content">
                        <div className="c-feature-category">
                        <Skeleton height={25} width={100} />
                        </div>
                        <p>Current Price : <span><Skeleton height={30} width={80} /></span></p>
                        <div className="auction-card-bttm">
                          <div className="skeleton-centered">
                            <Skeleton height={30} width={100} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
        ) : (
          <div className="row gy-4 mb-60 d-flex justify-content-center">
            {auctions.map((auction) => (
              <div key={auction.id} className="col-lg-4 col-md-6 col-sm-10 d-flex">
                <LiveAuctionCard
                  image={auction.product.image_urls[0]}
                  price={auction?.product?.start_price}
                  title={auction?.product?.title}
                  startTime={auction?.start_time}
                  endTime={auction?.end_time}
                  status={auction?.dynamic_status}
                  id={auction?.id}
                  isPaused={auction?.status}
                />
              </div>
            ))}
          </div>
        )}

        <div className="row d-flex justify-content-center">
          <div className="col-md-4 text-center">
            <Link
              to={`/live-auction`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="eg-btn btn--primary btn--md mx-auto"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default LiveAuctionHome1;
