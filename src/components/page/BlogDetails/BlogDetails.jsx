import React, {useEffect} from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import BlogDetailsWrap from './BlogDetailsWrap'

function BlogDetails() {
  useEffect(() => {
    document.title = "NVT Trading-Blog Details";
  }, []);
  return (
    <>
     <Breadcrumb pageName="Blog Details" pageTitle="Blog Details" />
        <BlogDetailsWrap/>
        <AboutUsCounter/>
    </>
  )
}

export default BlogDetails
