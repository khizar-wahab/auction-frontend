import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide, } from "swiper/react";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../../config";

// import SwiperCore, {
//   Autoplay,
//   EffectFade,
//   Pagination,
// } from "swiper";
// import "swiper/css/autoplay";

// SwiperCore.use([ Pagination, Autoplay, EffectFade]);

function HeroBanner() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const bennarSlider= {
    slidesPerView: 1,
    speed: 2500,
    loop: true,
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    parallax: true,
    effect: 'fade',
    navigation: false,
    fadeEffect: {
      crossFade: true,
    },
    // navigation: {
    //   nextEl: '.hero-next3',
    //   prevEl: '.hero-prev3',
    // },
    autoplay:{
        delay: 5000,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".hero-one-pagination",
      clickable: true,
      // renderBullet: function(index, className) {
      //   return '<span class="' + className + '">' +  0  + (index + 1) + "</span>";
      // }
    }
  }

  const [banner, setBanner] = useState([]);
  const [css , setCss] = useState('');

  const getData = () => {
    let endpoint = import.meta.env.APP_API_BASE_URL + `/banner-upload`;
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBanner(data.data);


        data.data.map((item) => {
          setCss((prev) => {
            return prev + `.slider-id-${item.id} .slider-bg-1::before {
              content: "";
              background-image: url('${item.image}')!important;
              background-size: cover;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              z-index: -9;
              animation: large 26s linear infinite alternate;
          }`
          })
        })
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }
  useEffect(() => {
    getData();
    console.log(getData());
  }, []);

  return (
    <>
    <div dangerouslySetInnerHTML={{ __html:`<style>${css}</style>` }}>

    </div>
      <div className="hero-area hero-style-one">
        <div className="hero-main-wrapper position-relative">
          <Swiper {...bennarSlider} className="swiper banner1">
            <div className="swiper-wrapper">
              {banner.map(banner => (

              <SwiperSlide  key={banner.id} className={`swiper-slide slider-id-${banner.id}`}>
                <div className="slider-bg-1">
                  <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-xl-8 col-lg-10">
                        <div className="banner1-content">
                          <span>Welcome To Auction House</span>
                          <h1>{banner.heading}</h1>
                          <p>
                           {banner.description}
                          </p>
                          <Link
                            to={`/live-auction`}
                            onClick={scrollTop}
                            className="eg-btn btn--primary btn--lg"
                          >
                            Start Exploring
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

        ))}

            </div>
          </Swiper>
          <div className="hero-one-pagination d-flex justify-content-center flex-column align-items-center gap-3" />
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
