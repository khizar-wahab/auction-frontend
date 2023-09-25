import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import { useEffect } from 'react';

function BlogPostCategory() {
  const [data, setData] = useState([]);

  const getData = () => {
    const endpoint = BASE_URL + `/get-article-category`;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     <div className="blog-widget-item wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".4s">
        <div className="top-blog">
          <div className="sidebar-widget-title">
            <h4>Post Categories</h4>
            <span />
          </div>
          <div className="blog-widget-body">
            <ul className="category-list">
              {data.map(item => (
                <li key={item.id}><Link to={`/blog?category=${item.id}`}><span>{item.name}</span><span>{item.count > 0 && item.count <=9? '0' + item.count: item.count}</span></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>   
    </>
  )
}

export default BlogPostCategory