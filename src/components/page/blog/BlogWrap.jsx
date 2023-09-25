import React from "react";
import Pagination from "../../common/Pagination";
import BlogSingleItem from "./BlogSingleItem";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../../config";

function BlogWrap() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const url = new URL(window.location.href);

  const navigate = useNavigate();

  const getData = () => {
    let endpoint = BASE_URL + `/articles?page=${url.searchParams.get('page') ? url.searchParams.get('page') : 1}`;

    if (url.searchParams.get('category')) {
      endpoint += `&category_id=${url.searchParams.get('category')}`;
    }

    if (url.searchParams.get('q')) {
      endpoint += `&q=${url.searchParams.get('q')}`;
    }

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.data);
        setPagination({
          current: data.current_page - 1,
          total: data.last_page,
        });
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (pageNo) => {
    url.searchParams.set('page', pageNo);
    navigate(url.search);
    getData();
  }
  return (
    <>
      <div className="blog-section pt-120 pb-120">
        <img
          alt="images"
          src={"/images/bg/section-bg.png"}
          class="img-fluid section-bg-top"
        />
        <img
          alt="images"
          src={"/images/bg/section-bg.png"}
          class="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row d-flex justify-content-center g-4 mb-60">
            {posts.map(post => (
              <div key={post.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-10">
                <BlogSingleItem
                  date={moment(post.created_at).format('MMM DD, YYYY')}
                  image={post.image_url}
                  blogContent={post.title}
                  authorName="Johan Martin"
                  totalComments={post.total_comments > 0 & post.total_comments <= 9 ? '0' + post.total_comments: post.total_comments}
                  slug={post.id}
                />
              </div>
            ))}
          </div>

          <Pagination
            onPageChange={handlePageChange}
            pagination={pagination}
          />
        </div>
      </div>
    </>
  );
}

export default BlogWrap;
