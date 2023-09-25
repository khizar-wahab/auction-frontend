import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import { useEffect } from 'react';
import moment from 'moment';

function BlogRecentPostWidget(props) {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    const endpoint = BASE_URL + '/articles?limit=3';
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
      <div className="blog-widget-item wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".4s">
        <div className="blog-category">
          <div className="sidebar-widget-title">
            <h4>Recent Post</h4>
            <span />
          </div>
          <div className="blog-widget-body">
            <ul className="recent-post">
              {posts?.filter(post => post.id !== props.skipId).map(post => (
                <li className="single-post">
                  <div className="post-img">
                    <Link to={`/blog-details/${post.id}`} onClick={scrollTop}><img alt="images" src={post.image_url} /></Link>
                  </div>
                  <div className="post-content">
                    <span>{moment(post.created_at).format('MMM DD, YYYY')}</span>
                    <h6><Link to={`/blog-details/${post.id}`} onClick={scrollTop}>{post.title}</Link>
                    </h6>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogRecentPostWidget