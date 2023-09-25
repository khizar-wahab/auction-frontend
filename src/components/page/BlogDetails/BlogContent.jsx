import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
function BlogContent({ content }) {
  return (
    <>
      <div className="blog-content" dangerouslySetInnerHTML={{__html: content}}>
      
      </div>
    </>
  );
}

export default BlogContent;
