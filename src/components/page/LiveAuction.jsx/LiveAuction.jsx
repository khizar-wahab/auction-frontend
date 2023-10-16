import React, {useEffect} from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import LiveAuctionWrap from './LiveAuctionWrap'
import { useParams } from 'react-router-dom';
import SearchAuctionCard from './SearchAuctionCard';

function LiveAuction() {
  const { search } = useParams();
  useEffect(() => {
    document.title = "NVT Trading-Live Auction";
  }, []);

  

  return (
    <>
     <Breadcrumb pageName="Live Auction" pageTitle="Live Auction"/>
      {
        search ?(
          <>
            <SearchAuctionCard/>
          </>
        ):
          <>
            <LiveAuctionWrap/>
          </>
        }
     {/* <AboutUsCounter/> */}
    </>
  )
}

export default LiveAuction