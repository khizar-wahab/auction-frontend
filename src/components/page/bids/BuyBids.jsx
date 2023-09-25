import React, {useEffect} from "react";
import Breadcrumb from "../../common/Breadcrumb";
import BuyBidWrapper from "./BuyBidWrapper";

function BuyBids() {
  useEffect(() => {
    document.title = "NVT Trading-Buy Bids";
  }, []);
  return (
    <>
    <Breadcrumb pageName = 'Buy Bids' pageTitle = 'Buy Bids '/>
    <BuyBidWrapper/>
    </>
  );
}

export default BuyBids;
