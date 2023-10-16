import React from "react";

import { Link } from "react-router-dom";
import LanguageTranslator from "../languageTranslator";
// import Select from 'react-select';
// import { curencyOptions } from "../../data/data";
function TopbarHeader() {
  // const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div className="topbar">
        <div className="topbar-left d-flex flex-row align-items-center">
          {/* <h6>Follow Us</h6>
          <ul className="topbar-social-list gap-2">
            <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
            <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
            <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a></li>
            <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest-alt" /></a></li>
          </ul> */}
        </div>
        <div className="email-area">
          {/* <h6>Email: <a href="mailto:contact@example.com">contact@example.com</a></h6> */}
        </div>
        <div className="topbar-right">
          <ul className="topbar-right-list">
           
            <li>
              <LanguageTranslator />
            </li>
            {/* <li><img src={"/images/icons/flag-eng.png"} alt="images" /><span>Language</span>
              <ul className="topbar-sublist">
                <li><img src={"images/icons/flag-germeny.svg"} alt="images" /><span>Germeny</span></li>
                <li> <img src={"/images/icons/flag-french.svg"} alt="images" /><span>French</span></li>
                <li><img src={"/images/icons/flag-bangla.svg"} alt="images" /><span>Bengali</span></li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
export default TopbarHeader;
