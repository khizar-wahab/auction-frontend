import React, {useEffect} from "react";
import Breadcrumb from "../../common/Breadcrumb";
import FaqWrap from "./FaqWrap";

function Faq() {
  useEffect(() => {
    document.title = "NVT Trading-FAQ";
  }, []);
  return (
    <>
      <Breadcrumb pageName="FAQ" pageTitle="FAQ" />
      <FaqWrap/>
    </>
  );
}

export default Faq;
