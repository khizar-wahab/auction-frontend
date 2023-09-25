import React from 'react'
import AboutUsCounter from '../../common/AboutUsCounter'
import Breadcrumb from '../../common/Breadcrumb'
import AuctionDetailsWrap from './AuctionDetailsWrap'
import { useParams } from 'react-router-dom';


function AuctionDetails() {
  const { id } = useParams();
  return (
    <>
      <Breadcrumb pageName="Auction Details" pageTitle="Auction Details" />
      <AuctionDetailsWrap id={id} />
      {/* <AboutUsCounter /> */}
    </>
  )
}

export default AuctionDetails