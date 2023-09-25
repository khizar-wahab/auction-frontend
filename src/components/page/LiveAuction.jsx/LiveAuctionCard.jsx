import React from "react";
import { Link } from "react-router-dom";
import Counter from "../../common/Counter";
import moment from "moment";
import TimeCounter from "../../common/TimeCounter";

function LiveAuctionCard(props) {

  return (
    <>
      <div
        data-wow-duration="1.5s"
        data-wow-delay="0.2s"
        className="eg-card auction-card1 wow fadeInDown d-flex"
      >
        <div className="auction-img">
          <img alt="images" src={`${props.image}`} />
         {
  props.isPaused == 1 ? (
    props.status === 'live' ? (
      <div className="auction-timer">
        <div className="countdown" id="timer1">
          <h4>
            <Counter countDownDate={moment(props.endTime).format('MMM DD, YYYY, HH:mm:ss')} />
          </h4>
        </div>
      </div>
    ) : (
      <div className="c-feature-card1">
        <div className="auction-timer2 gap-lg-3 gap-md-2 gap-1" id="timer7">
          <TimeCounter countdownDate={moment(props.startTime).format('MMM DD, YYYY, HH:mm:ss')} />
        </div>
      </div>
    )
  ) : (
  
      <div className="">
      </div>
  )
}



          {/* <div className="author-area">
            <div className="author-emo">
              <img
                alt="images"
                src={"/images/icons/smile-emo.svg"}
              />
            </div>
            <div className="author-name">
              <span>by @robatfox</span>
            </div>
          </div> */}
        </div>
        <div className="auction-content">
          <h4>
            <Link
              to={`/auction-details/${props.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {props.title}
            </Link>
          </h4>
          <p>
            Current Bid : <span>${props.price}</span>
          </p>
          <div className="auction-card-bttm">
            {
          props.isPaused == 1 ? (
            <Link
              to={`/auction-details/${props.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="eg-btn btn--primary btn--sm"
            >
              Place a Bid
            </Link>
            ) : (
              <Link
              to={`/auction-details/${props.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="eg-btn btn--primary btn--sm"
            >
              Bid Paused
            </Link>
              )
}

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
    </>
  );
}

export default LiveAuctionCard;
