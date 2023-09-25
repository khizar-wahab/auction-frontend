import React, {useEffect} from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import BlogWrap from './BlogWrap'

function Blog() {
  useEffect(() => {
    document.title = "NVT Trading-Our Blog";
  }, []);
  return (
    <>
     <Breadcrumb pageTitle="Blog" pageName="Our Blog"/>
     <BlogWrap/>
     <AboutUsCounter/>

    </>
  )
}

export default Blog