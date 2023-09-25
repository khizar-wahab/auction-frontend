import React, { useEffect } from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import DashbordWrap from './DashboardWrap'
import { useNavigate  } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }
  }, [history]);
  return (
    <>
     <Breadcrumb pageName="Dashboard" pageTitle="Dashboard"/> 
     <DashbordWrap/>
     {/* <AboutUsCounter/>   */}
    </>
  )
}

export default Dashboard