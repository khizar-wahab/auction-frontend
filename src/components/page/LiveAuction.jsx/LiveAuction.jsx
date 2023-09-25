import React, {useEffect} from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import LiveAuctionWrap from './LiveAuctionWrap'
import { useParams } from 'react-router-dom';

function LiveAuction() {
  useEffect(() => {
    document.title = "NVT Trading-Live Auction";
  }, []);
  return (
    <>
     <Breadcrumb pageName="Live Auction" pageTitle="Live Auction"/>
     <LiveAuctionWrap/>
     {/* <AboutUsCounter/> */}
    </>
  )
}

export default LiveAuction