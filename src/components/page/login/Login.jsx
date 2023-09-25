import React, {useEffect} from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import LoginWrap from './LoginWrap'

function Login() {
  useEffect(() => {
    document.title = "NVT Trading-Log In";
  }, []);
  return (
    <>
     <Breadcrumb pageName="Log In" pageTitle="Log In" />  
     <LoginWrap/> 
    </>
  )
}

export default Login