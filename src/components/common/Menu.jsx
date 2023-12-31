import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".header-area");
    const scrollTop = window.scrollY;
    scrollTop >= 20
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");
  };
  return (
    <>
      <div className={"main-menu"}>
        <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
          <div className="mobile-logo-wrap ">
            <Link to={"/"}>
              <img
                alt="logo"
                src={"/images/bg/header-logo.png"}
              />
            </Link>
          </div>
          <div className="menu-close-btn">
            <i className="bi bi-x-lg" />
          </div>
        </div>
        <ul className="menu-list">
          <li className="menu-item-has-children">
            <Link to={"#"} className="drop-down">
              Home
            </Link>
            <i className="bx bx-plus dropdown-icon" />
            <ul className="submenu">
              <li>
                <Link to="" onClick={scrollTop}>
                  Home 1
                </Link>
              </li>
              <li>
                <Link
                  to={`index2`}
                  onClick={scrollTop}
                >
                  Home 2
                </Link>
              </li>
              <li>
                <Link
                  to={`index3`}
                  onClick={scrollTop}
                >
                  Home 3
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={`/about`} onClick={scrollTop}>
              About Us
            </Link>
          </li>
          <li>
            <Link
              to={`/how-works`}
              onClick={scrollTop}
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              to={`/live-auction`}
              onClick={scrollTop}
            >
              Browse Product
            </Link>
          </li>
          <li className="menu-item-has-children">
            <Link to={"#"}>News</Link>
            <i className="bx bx-plus dropdown-icon" />
            <ul className="submenu">
              <li>
                <NavLink
                  to={`/blog`}
                  onClick={scrollTop}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/blog-details`}
                  onClick={scrollTop}
                >
                  Blog details
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu-item-has-children">
            <Link to={"#"} className="drop-down">
              Pages
            </Link>
            <i className="bx bx-plus dropdown-icon" />
            <ul className="submenu">
              <li>
                <NavLink
                  to={`/auction-details`}
                  onClick={scrollTop}
                >
                  Auction Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/faq`}
                  onClick={scrollTop}
                >
                  Faq
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard`}
                  onClick={scrollTop}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/login`}
                  onClick={scrollTop}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/signup`}
                  onClick={scrollTop}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/error`}
                  onClick={scrollTop}
                >
                  404
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <Link to={`/contact`} onClick={scrollTop}>
              Contact
            </Link>
          </li>
        </ul>
        {/* mobile-search-area */}
        <div className="d-lg-none d-block">
          <form className="mobile-menu-form">
            <div className="input-with-btn d-flex flex-column">
              <input type="text" placeholder="Search here..." />
              <button type="submit" className="eg-btn btn--primary btn--sm">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Menu;
