import React from 'react'
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, {
//   Autoplay,
//   Navigation,
// } from "swiper";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BASE_URL } from '../../../config';
import { useEffect } from 'react';
// SwiperCore.use([Navigation, Autoplay]);
function TestimonialHome1() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(`${import.meta.env.APP_API_BASE_URL}/get-testimonial`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
  }, [])

  const testimonialSlider = {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 24,
    loop: true,
    roundLengths: true,
    navigation: {
      nextEl: '.testi-prev1',
      prevEl: '.testi-next1',
    },

    breakpoints: {
      280: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 1,
        autoplay: true,
      },
      768: {
        slidesPerView: 1
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
      <div className="testimonial-section pt-80 pb-80">
        <img alt="testimonial-images" src={"/images/bg/client-right.png"} className="client-right-vector" />
        <img alt="testimonial-images" src={"/images/bg/client-left.png"} className="client-left-vector" />
        <img alt="testimonial-images" src={"/images/bg/clent-circle1.png"} className="client-circle1" />
        <img alt="testimonial-images" src={"/images/bg/clent-circle2.png"} className="client-circle2" />
        <img alt="testimonial-images" src={"/images/bg/clent-circle3.png"} className="client-circle3" />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <div className="section-title1">
                <h2>What Client Say</h2>
                <p className="mb-0">Explore on the world's best &amp; largest Bidding marketplace with our beautiful Bidding
                  products. We want to be a part of your smile, success and future growth.</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center position-relative">
            <Swiper {...testimonialSlider} className="swiper testimonial-slider">
              <div className="swiper-wrapper">
                {data.map(item => (
                  <SwiperSlide key={item.id} className="swiper-slide">
                    <div className="testimonial-single hover-border1 wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                      <img alt="testimonial-images" src={"/images/icons/quote-green.svg"} className="quote-icon" />
                      <div className="testi-img">
                        {item.image && (
                          <img alt="testimonial-images" src={item.image} />
                        )}
                      </div>
                      <div className="testi-content">
                        <p className="para">{item.description} </p>
                        <div className="testi-designation">
                          <h5><Link to={"#"}>{item.name}</Link></h5>
                          <p>{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
            <div className="slider-arrows testimonial2-arrow d-flex justify-content-between gap-3">
              <div className="testi-prev1 swiper-prev-arrow" tabIndex={0} role="button" aria-label="Previous slide"><i className="bi bi-arrow-left" /></div>
              <div className="testi-next1 swiper-next-arrow" tabIndex={0} role="button" aria-label="Next slide">
                <i className="bi bi-arrow-right" /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestimonialHome1