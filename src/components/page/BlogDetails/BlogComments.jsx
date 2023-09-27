import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import moment from 'moment/moment';

function BlogComments(props) {
  const [comments, setComments] = useState([]);

  const getData = () => {
    const endpoint = import.meta.env.APP_API_BASE_URL + `/articles/${props.postId}/comments`;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setComments(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  const handleReplyTo = (data) => {
    if (props.onReplyClick) {
      props.onReplyClick(data);
    }
  }

  useState(() => {
    getData();

    if (props.setOnRefreshComments) {
      props.setOnRefreshComments(() => {
        return () => {
          getData();
        }
      })
    }
  }, []);

  return (
    <>
      <div id="commentBox" className="blog-comment">
        <div className="blog-widget-title">
          <h4>Comments ({comments.length > 0 && comments.length < 9 ? `0${comments.length}` : comments.length})</h4>
          <span />
        </div>
        <ul className="comment-list mb-50">
          {comments?.map(comment => (
            <li key={comment.id}>
              <div className="comment-box">
                <div className="comment-header d-flex justify-content-between align-items-center">
                  <div className="author d-flex flex-wrap">
                    {comment.user && comment.user.image_url && (
                      <img alt="images" src={comment.user.image_url} />
                    )}
                    <h5><Link to={"#"}>{comment.name}</Link></h5><span className="commnt-date">{moment(comment.created_at).format('MMMM DD, YYYY')} at {moment(comment.created_at).format('hh:mm a')}</span>
                  </div>
                  <Link to={"#"} className="commnt-reply" onClick={() => handleReplyTo({id: comment.id, userName: comment.name})}><i className="bi bi-reply" /></Link>
                </div>
                <div className="comment-body">
                  <p className="para">{comment.description}</p>
                </div>
              </div>
              {comment.children.length && (
                <ul className="comment-reply">
                  {comment.children.map(child => (
                    <li key={child.id}>
                      <div className="comment-box">
                        <div className="comment-header d-flex justify-content-between align-items-center">
                          <div className="author d-flex flex-wrap">
                          {child.user && child.user.image_url && (
                            <img alt="images" src={child.user.image_url} />
                          )}
                            <h5><Link to={"#"}>{child.name}</Link></h5><span className="commnt-date"> {moment(child.created_at).format('MMMM DD, YYYY')} at {moment(child.created_at).format('hh:mm a')}</span>
                          </div>
                          <Link to={"#"} className="commnt-reply" onClick={() => handleReplyTo({id: comment.id, userName: child.name})}><i className="bi bi-reply" /></Link>
                        </div>
                        <div className="comment-body">
                          <p className="para">{child.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogComments