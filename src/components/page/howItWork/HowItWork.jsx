import React, {useEffect} from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import HowItWorkContent from './HowItWorkContent'
import WhyCHooseUs from './WhyCHooseUs'

function HowItWork() {
  useEffect(() => {
    document.title = "NVT Trading-How It Works";
  }, []);
  return (
    <>
     <Breadcrumb pageName="How It Works" pageTitle="How It Works"/>  
     <HowItWorkContent/>
     <WhyCHooseUs/> 
     {/* <AboutUsCounter/> */}
    </>
  )
}

export default HowItWork