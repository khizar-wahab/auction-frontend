import React from 'react'
import Footer from './common/Footer'
import Header from './common/Header'

function Layout({cc}) {
  return (
    <>
     <Header/> 
     {cc}
     <Footer/>  
    </>
  )
}

export default Layout