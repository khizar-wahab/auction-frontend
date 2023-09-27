import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from "swiper/react";
// import SwiperCore, {
//   Autoplay,
//   EffectFade,
//   Navigation,
//   Pagination,
// } from "swiper";
import "swiper/css/autoplay";
import { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL } from '../../../config'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// SwiperCore.use([ Pagination, Autoplay, EffectFade, Navigation]);
function Catagory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getCategories = import.meta.env.APP_API_BASE_URL + '/categories';
    fetch(getCategories)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }, []);
  const scrollTop = window.scrollTo({ top: 0, behavior: "smooth" })
  const caragorySlider = {
    slidesPerView: 1,
    
    speed: 1000,
    spaceBetween: 30,
    loop: false,
    autoplay: true,
    roundLengths: true,
    navigation: {
      nextEl: '.category-prev1',
      prevEl: '.category-next1',
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
       
       
      },
      440: {
        slidesPerView: 2
      },
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3,
        autoplay: true,
        speed: 1000,
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      },
      1400: {
        slidesPerView: 7
      },

    }
  }
  return (
    <>
      <div className="category-section pt-120 pb-120">
        <div className="container position-relative">
          <div className="row d-flex justify-content-center  align-items-center text-center">
            {loading ? (
              <>
                 <Swiper {...caragorySlider} className="swiper category1-slider">
                  <div className="swiper-wrapper justify-content-center">
                    {Array(4).fill(undefined).map((_, index) => (
                      <SwiperSlide className="swiper-slide" key={index}>
                        <div className="swiper-slide">
                          <div className="eg-card category-card1">
                            <div className="cat-icon">
                              <div className="skeleton-centered">
                                <Skeleton height={60} width={60} />
                              </div>
                            </div>
                            <div className="skeleton-centered">
                              <Skeleton height={20} width={100} />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </>
            ) : (
              // Render the actual category data once loaded
              <Swiper {...caragorySlider} className="swiper category1-slider">
                <div className="swiper-wrapper justify-content-center">
                  {categories.map(category => (
                    <SwiperSlide className="swiper-slide" key={category.id}>
                      <div className="eg-card category-card1 wow animate fadeInDown" data-wow-duration="1500ms" data-wow-delay="200ms">
                        <div className="cat-icon">
                          <img src={category.image_url} alt="" style={{ height: "60px" }} />
                        </div>
                        <Link to={`/live-auction/?category=${category.id}`} onClick={scrollTop}>
                          <h5>{category.title}</h5>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            )}
          </div>
          <div className="slider-arrows text-center d-lg-flex d-none  justify-content-end">
            <div className="category-prev1 swiper-prev-arrow" tabIndex={0} role="button" aria-label="Previous slide"> <i className="bx bx-chevron-left" /> </div>
            <div className="category-next1 swiper-next-arrow" tabIndex={0} role="button" aria-label="Next slide"> <i className="bx bx-chevron-right" /></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Catagory