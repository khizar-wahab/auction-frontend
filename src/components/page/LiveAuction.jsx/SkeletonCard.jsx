import React from "react";
import { Link } from "react-router-dom";
import Counter from "../../common/Counter";
import moment from "moment";
import TimeCounter from "../../common/TimeCounter";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = (props) => {
    return (
        <>
            <div
                data-wow-duration="1.5s"
                data-wow-delay="0.2s"
                className="eg-card auction-card1 wow fadeInDown d-flex"
            >
                <div className="auction-img">
                    <Skeleton width={414} height={336} />
                    {/* {props.status === 'live' ? (
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
                    )} */}
              
                </div>
                <div className="auction-content">
                    <h4>
                        <Skeleton width={200} height={35} />
                    </h4>
                    <p>
                        <Skeleton width={150} height={20} />
                    </p>
                    <div className="auction-card-bttm">
                        <Skeleton width={100} height={30} />
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
    )
}

export default SkeletonCard
