import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function BlogSearchWidget() {
  const [searchQ, setSearchQ] = useState('');

  return (
    <>
      <div
        className="blog-widget-item wow fadeInUp"
        data-wow-duration="1.5s"
        data-wow-delay=".2s"
      >
        <div className="search-area">
          <div className="sidebar-widget-title">
            <h4>Search From Blog</h4>
            <span />
          </div>
          <div className="blog-widget-body">
            <form>
              <div className="form-inner">
                <input type="text" name="q" placeholder="Search Here" onChange={(e) => setSearchQ(e.target.value)} />
                <Link to={searchQ? `/blog/?q=${searchQ}`: '#'} className="search--btn">
                  <i className="bx bx-search-alt-2" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogSearchWidget;
