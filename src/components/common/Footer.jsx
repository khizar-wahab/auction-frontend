import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import { BASE_URL } from "../../config";
import moment from "moment";
function Footer(props) {

  const [posts, setPosts] = useState([]);

  // const getData = () => {
  //   const endpoint = BASE_URL + '/articles?limit=3';
  //   fetch(endpoint)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setPosts(data.data);
  //     })
  //     .catch(error => {
  //       console.error('Failed:', error);
  //     });
  // }

  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();

    //getData();
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  return (
    <>
      <footer style={{backgroundImage: 'none'}}>
        <div className="footer-top">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <Link to="" onClick={scrollTop}><img alt="images" className="footer-img" src={"/images/bg/footer-logo.png"} /></Link>
                  <p>Bid on unique products, and experience the thrill of winning. Join our community of passionate bidders today!</p>
                  {/* <form>
                    <div className="input-with-btn d-flex jusify-content-start align-items-strech">
                      <input type="text" placeholder="Enter your email" />
                      <button type="submit"><img alt="images"  src={"/images/icons/send-icon.svg"} /></button>
                    </div>
                  </form> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h5>Navigation</h5>
                  <ul className="footer-list">
                    <li><Link onClick={scrollTop} to={`/live-auction`}>Live Auction</Link></li>
                    <li><Link onClick={scrollTop} to={`/how-works`}>How It Works</Link></li>
                    <li><Link onClick={scrollTop} to={`/login`}>My Account</Link></li>                   
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h5>Usefull Link</h5>
                  <ul className="footer-list">
                    {/* <li><Link to={`/product`} onClick={scrollTop}>Help Center</Link></li> */}
                    <li><Link to={`/faq`} onClick={scrollTop}>FAQs</Link></li>
                    <li><Link to={`/login`} onClick={scrollTop}>Contact</Link></li>
                    {/* <li><Link onClick={scrollTop} to={`/about`}>About Us</Link></li> */}
                    {/* <li><Link to={`/about`} onClick={scrollTop}>Security Information</Link></li> */}
                    {/* <li><Link to={`/blog`} onClick={scrollTop}>Merchant Add Policy</Link></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row d-flex align-items-center g-4">
              <div className="col-lg-6 d-flex justify-content-lg-start justify-content-center">
                <p>Copyright 2023 <Link to={"#"}>NVT Trading</Link> | Design By ADMKSOL</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
