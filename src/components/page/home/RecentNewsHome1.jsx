import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import moment from 'moment/moment';
function RecentNewsHome1() {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    const endpoint = BASE_URL + '/articles?limit=2';
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  return (
    <>
      <div className="recent-news-section pt-120 pb-120">
        <img alt="recentImage" src={"/images/bg/section-bg.png"} className="img-fluid section-bg" />
        <img alt="recentImage" src={"/images/icons/dot-circle.svg"} className="dot-circle" />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <div className="section-title1">
                <h2>Our Recent News</h2>
                <p className="mb-0">Explore on the world's best &amp; largest Bidding marketplace with our beautiful Bidding
                  products. We want to be a part of your smile, success and future growth.</p>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center g-4">
            {posts?.map(post => (
              <div key={post.id} className="col-md-6 col-sm-10">
                <div className="single-blog-style1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                  <div className="blog-img">
                    <Link to={"#"} className="blog-date"><i className="bi bi-calendar-check" />{moment(post.created_at).format('MMM DD, YYYY')}</Link>
                    <img alt="recentImage" src={post.image_url} />
                  </div>
                  <div className="blog-content">
                    <h5><Link to={`/blog-details/${post.id}`} onClick={scrollTop}>{post.title}</Link></h5>
                    <div className="blog-meta">
                      <div className="author">
                        <img alt="recentImage" src={"/images/blog/author1.png"} />
                        <Link to={"#"} className="author-name">Johan Martin</Link>
                      </div>
                      <div className="comment">
                        <img alt="recentImage" src={"/images/icons/comment-icon.svg"} />
                        <Link to={"#"} className="comment">{post.total_comments > 0 & post.total_comments <= 9 ? '0' + post.total_comments: post.total_comments}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentNewsHome1