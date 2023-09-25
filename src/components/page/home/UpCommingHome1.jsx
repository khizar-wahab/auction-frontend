import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TimeCounter from '../../common/TimeCounter'
import "swiper/css/autoplay";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, {
//   Autoplay,
//   Navigation,
// } from "swiper";
import { BASE_URL } from '../../../config';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// SwiperCore.use([Navigation, Autoplay]);

function UpCommingHome1() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);


  const getData = () => {
    const getAuctions = BASE_URL + '/auctions?limit=6&status=upcoming';
    fetch(getAuctions)
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

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
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
      <div className="upcoming-seciton pb-120">
        <img alt="images" src={"/images/bg/section-bg.png"} className="img-fluid section-bg" />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <div className="section-title1">
                <h2>Up Coming Auction</h2>
                <p className="mb-0">Explore on the world's best &amp; largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            {loading ? (
              <Swiper {...upcomingSlider} className="swiper upcoming-slider">
                <div className="swiper-wrapper">
                  {Array(3).fill(undefined).map((_, index) => (
                    <SwiperSlide className="swiper-slide">
                      < div className="c-feature-card1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                        <div className="skeleton-centered mt-0">
                          <Skeleton height={420} width={428} />
                        </div>
                        <div className="c-feature-content">
                          <div className="c-feature-category">
                            <Skeleton height={25} width={100} />
                          </div>
                          <p>Bidding Price : <span><Skeleton height={30} width={80} /></span></p>
                          <div className="auction-card-bttm">
                            <div className="skeleton-centered">
                              <Skeleton height={20} width={100} />
                            </div>
                            <div className="share-area">
                              <ul className="social-icons d-flex">
                                <li><Link to={"#"}><i className="bx bxl-facebook" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-twitter" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-pinterest" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-instagram" /></Link></li>
                              </ul>
                              <div>
                                <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>

            ) : (
              <Swiper {...upcomingSlider} className="swiper upcoming-slider">
                <div className="swiper-wrapper">
                  {auctions?.map(auction => (
                    <SwiperSlide key={auction.id} className="swiper-slide">
                      <div className="eg-card c-feature-card1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                        <div className="auction-img">
                          <img alt="images" src={auction.product.image_urls[0]} />
                          <div className="auction-timer2 gap-lg-3 gap-md-2 gap-1" id="timer7">
                            <TimeCounter countdownDate={moment(auction.start_time).format('MMM DD, YYYY, HH:mm:ss')} />
                          </div>
                          {/* <div className="author-area2">
                          <div className="author-name">
                            <span>by @robatfox</span>
                          </div>
                          <div className="author-emo">
                            <img alt="images" src={"/images/bg/upcoming-author1.png"} />
                          </div>
                        </div> */}
                        </div>
                        <div className="c-feature-content">
                          {/* <div className="c-feature-category">Time Zoon</div> */}
                          <Link to={`/auction-details/${auction.id}`} onClick={scrollTop}>
                            <h4>{auction.product.title}</h4>
                          </Link>
                          <p>Bidding Price : <span>${auction.product.start_price}</span></p>
                          <div className="auction-card-bttm">
                            <Link to={`/auction-details/${auction.id}`} onClick={scrollTop} className="eg-btn btn--primary btn--sm">View
                              Details</Link>
                            <div className="share-area">
                              <ul className="social-icons d-flex">
                                <li><Link to={"#"}><i className="bx bxl-facebook" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-twitter" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-pinterest" /></Link></li>
                                <li><Link to={"#"}><i className="bx bxl-instagram" /></Link></li>
                              </ul>
                              <div>
                                <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            )}

            <div className="slider-bottom d-flex justify-content-between align-items-center">
              <Link to={`/live-auction?status=upcoming`} onClick={scrollTop} className="eg-btn btn--primary btn--md">View ALL</Link>
              <div className="swiper-pagination style-3 d-lg-block d-none" />
              <div className="slider-arrows coming-arrow d-flex gap-3">
                <div className="coming-prev1 swiper-prev-arrow" tabIndex={0} role="button" aria-label="Previous slide"><i className="bi bi-arrow-left" /></div>
                <div className="coming-next1 swiper-next-arrow" tabIndex={0} role="button" aria-label="Next slide"><i className="bi bi-arrow-right" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpCommingHome1