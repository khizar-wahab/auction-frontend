import React, {useEffect} from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import SignUpWrap from './SignUpWrap'

function SignUp() {
  useEffect(() => {
    document.title = "NVT Trading-Sign Up";
  }, []);
  return (
    <>
     <Breadcrumb pageName="Sign Up" pageTitle="Sign Up"/>   
     <SignUpWrap/>
    </>
  )
}

export default SignUp