import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../../config';

function CommentForm(props) {
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    description: null,
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!e.target[0].value) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, name: null }));
    }

    if (!e.target[1].value) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }

    if (!e.target[2].value) {
      setErrors(prev => ({ ...prev, description: 'Message is required' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, description: null }));
    }

    if (valid) {
      store({
        name: e.target[0].value,
        email: e.target[1].value,
        description: e.target[2].value,
        parent_id: props.replyTo? props.replyTo.id: null,
      }, () => e.target.reset());
    }
  }

  const store = (data, onSuccess) => {
    setLoading(true);

    fetch(`${BASE_URL}/articles/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);

        if (props.onComment) {
          props.onComment(data.data);
        }

        onSuccess();
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  return (
    <>
      <div id="commentForm" className="comment-form pb-120">
        <div className="blog-widget-title style2">
          {!props.replyTo? (
            <h4>Leave A Comment</h4>
          ): (
            <h4>Reply to {props.replyTo.userName}</h4>
          )}
          <p className="para">Your email address will not be published.</p>
          <span />
        </div>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-6">
              <div className="form-inner">
                <input type="text" name="name" placeholder="Your Name :" />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-6">
              <div className="form-inner">
                <input type="email" name="email" placeholder="Your Email :" />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <textarea name="message" placeholder="Write Message :" rows={12} defaultValue={""} />
                {errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="eg-btn btn--primary btn--md form--btn d-flex justify-content-center align-items-center gap-2">
                {!loading? (
                  <span>Submit Now</span>
                ): (
                  <>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Submiting...</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CommentForm