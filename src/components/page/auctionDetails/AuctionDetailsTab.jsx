import React from "react";
import { Link } from "react-router-dom";
import Counter from "../../common/Counter";
import { BASE_URL } from "../../../config";
import { useState, useEffect } from "react";
import moment from "moment"; 
import profile from "../../../assets/images/FlagIcon/user (1).png"


function AuctionDetailsTab(props) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [otherAuction, setOtherAuction] = useState([]);
  
  useEffect(() => {
    const getAuction =
      BASE_URL +
      "/categories/" +
      props.auction?.product.category_id +
      "/auctions/?limit=2&status=live";
    fetch(getAuction)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOtherAuction(data.data);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  }, [props.auction?.product.category_id]);

  const [bidingHistory, setBidingHistory] = useState([]);
  const bidHisting = () => {
    const getBiddings =
      BASE_URL + "/auctions/" + props.auction?.id + "/bids/?limit=5";
    fetch(getBiddings)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBidingHistory(data.data);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  };
  useEffect(() => {
    bidHisting();

    if (props.setRefreshBidHistory) {
      props.setRefreshBidHistory(() => {
        return () => {
          bidHisting()
        };
      });
    }
  }, []);
  
  return (
    <>
      <div className="row d-flex justify-content-center g-4">
        <div className="col-lg-8">
          <ul
            className="nav nav-pills d-flex flex-row justify-content-start gap-sm-4 gap-3 mb-45 wow fadeInDown"
            data-wow-duration="1.5s"
            data-wow-delay=".2s"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active details-tab-btn"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link details-tab-btn"
                id="pills-bid-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-bid"
                type="button"
                role="tab"
                aria-controls="pills-bid"
                aria-selected="false"
                
              >
                Biding History
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button
                className="nav-link details-tab-btn"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Other Auction
              </button>
            </li> */}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay=".2s"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="describe-content">
                <p>{props.auction?.product.description}</p>
                {props.auction?.product.delivery_info ? (
                  <p>{props.auction?.product.delivery_info}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-bid"
              role="tabpanel"
              aria-labelledby="pills-bid-tab"
            >
              <div className="bid-list-area">
                <ul className="bid-list">
                  {bidingHistory?.map((history,index) => {
                    const historyDate = new Date(history.created_at);
                    const now = new Date();
                    const timeDifferenceMs = now - historyDate;
                    const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));
                    const hoursAgo = Math.floor(minutesAgo / 60);
                    const daysAgo = Math.floor(hoursAgo / 24);

                    let timeAgoString = '';

                    if (daysAgo === 0) {
                      if (hoursAgo === 0) {
                        timeAgoString = `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
                      } else {
                        timeAgoString = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''}, ${minutesAgo % 60} minute${minutesAgo % 60 !== 1 ? 's' : ''} ago`;
                      }
                    } else {
                      timeAgoString = `${daysAgo} day${daysAgo !== 1 ? 's' : ''}, ${hoursAgo % 24} hour${hoursAgo % 24 !== 1 ? 's' : ''} ago`;
                    }
                    return (
                      <li key={index}>
                        <div className="row d-flex align-items-center">
                          <div className="col-7">
                            <div className="bidder-area">
                              <div className="bidder-img">
                                <img
                                  alt="images"
                                  src={
                                    profile
                                    // history.user.image_url?
                                    // history.user.image_url:
                                    
                                    // "/images/bg/bidder1.png"
                                  }
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                  }}
                                />
                              </div>
                              <div className="bidder-content">
                                <Link to={"#"}>
                                  {/* <h6>{history?.user?.name}</h6> */}
                                  <h6>Bidder</h6>
                                </Link>
                                <p>{history?.amount}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-5 text-end">
                            <div className="bid-time">
                              <p>{timeAgoString}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {/* {!bidingHistory.length && (
                    <p className="my-4">No bids</p>
                  )} */}
                </ul>
              </div>
            </div>
            {/* <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div className="row d-flex justify-content-center">
                {otherAuction?.map((auction) => (
                  <div key={auction.id} className="col-lg-6 col-md-6 col-sm-10 ">
                    <div className="eg-card auction-card1">
                      <div className="auction-img">
                        <img
                          alt="images"
                          src={props.auction?.product?.image_urls[0]}
                        />
                        <div className="auction-timer">
                          <div className="countdown" id="timer1">
                            <h4>
                              <Counter
                                countDownDate={moment(auction.end_time).format('MMM DD, YYYY, HH:mm:ss')}
                              />
                            </h4>
                          </div>
                        </div>
                        <div className="author-area">
                          <div className="author-emo">
                            <img
                              alt="imagess"
                              src={
                                
                                "/images/icons/smile-emo.svg"
                              }
                            />
                          </div>
                          <div className="author-name">
                            <span>by @robatfox</span>
                          </div>
                        </div>
                      </div>
                      <div className="auction-content">
                        <h4>
                          <Link
                            to={`/auction-details/${auction.id}`}
                            onClick={scrollTop}
                          >
                            {props.auction?.product?.title}
                          </Link>
                        </h4>
                        <p>
                          Bidding Price :{" "}
                          <span>${props.auction?.product?.start_price}</span>{" "}
                        </p>
                        <div className="auction-card-bttm">
                          <Link
                            to={`/auction-details/${props.auction.id}`}
                            onClick={scrollTop}
                            className="eg-btn btn--primary btn--sm"
                          >
                            Place a Bid
                          </Link>
                          <div className="share-area">
                            <ul className="social-icons d-flex">
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-facebook" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-twitter" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-pinterest" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-instagram" />
                                </Link>
                              </li>
                            </ul>
                            <div>
                              <Link to={"#"} className="share-btn">
                                <i className="bx bxs-share-alt" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-4">
          {/* <div className="blog-sidebar">
            <div
              className="sidebar-banner wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay="1s"
            >
              <span>Cars</span>
              <h3>Toyota AIGID A Clasis Cars Sale</h3>
              <Link
                to={`/auction-details`}
                onClick={scrollTop}
                className="eg-btn btn--primary card--btn"
              >
                Details
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default AuctionDetailsTab;
