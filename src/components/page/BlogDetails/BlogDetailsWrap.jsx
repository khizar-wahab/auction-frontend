import React from "react";
import { Link } from "react-router-dom";
import BlogAuthorAndTag from "./BlogAuthorAndTag";
import BlogComments from "./BlogComments";
import BlogContent from "./BlogContent";
import BlogPostCategory from "./BlogPostCategory";
import BlogRecentPostWidget from "./BlogRecentPostWidget";
import BlogSearchWidget from "./BlogSearchWidget";
import BlogSidebarBanner from "./BlogSidebarBanner";
import BlogSocialLink from "./BlogSocialLink";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../../config";
import moment from "moment";
import { useEffect } from "react";

function BlogDetailsWrap() {
  const [post, setPost] = useState(null);
  const [onRefreshComments, setOnRefreshComments] = useState(() => {});
  const [replyTo, setReplyTo] = useState(null);
  const params = useParams();

  const getData = () => {
    const endpoint = import.meta.env.APP_API_BASE_URL + `/articles/${params.id}`;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPost(data.data);
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
      <div className="blog-details-section pb-120">
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
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {post && (
              <div className="blog-details-single">
                <div class="blog-img">
                  <img alt="images" src={post?.image_url} className="img-fluid wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s" />
                </div>
                <ul class="blog-meta gap-2">
                  <li><Link to={"#"}><img alt="images" src={"/images/icons/calendar.svg"} />Date: {moment(post.created_at).format('DD MMM, YYYY')}</Link></li>
                  <li><Link to={"#"}><img alt="images" src={"/images/icons/tags.svg"} />Auction</Link></li>
                  <li><Link to={"#"}><img alt="images" src={"/images/icons/admin.svg"} />Posted by Admin</Link></li>
                </ul>
                <h3 className="blog-title">{post?.title}</h3>
                <BlogContent content={post.content} />
                <BlogAuthorAndTag />
                <BlogComments 
                  postId={post.id}
                  setOnRefreshComments={setOnRefreshComments}
                  onReplyClick={(data) => {
                    setReplyTo(data)
                    document.querySelector('#commentForm').scrollIntoView(
                      { behavior: "smooth", block: "center" }
                    );
                  }}
                />
                <CommentForm 
                  postId={post.id}
                  onComment={() => {
                    document.querySelector('#commentBox').scrollIntoView(
                      { behavior: "smooth", block: "center" }
                    );
                    setReplyTo(null);
                    onRefreshComments()
                  }}
                  replyTo={replyTo}
                />
              </div>
            )}
          </div>
          <div className="col-lg-4">
            <div className="blog-sidebar">
              <BlogSearchWidget />
              <BlogRecentPostWidget skipId={post?.id} />
              <BlogPostCategory />
              <BlogSocialLink />
              <BlogSidebarBanner />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetailsWrap;
