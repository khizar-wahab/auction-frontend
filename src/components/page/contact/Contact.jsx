import React, {useEffect} from "react";
import AboutUsCounter from "../../common/AboutUsCounter";
import Breadcrumb from "../../common/Breadcrumb";
import ContactWrapper from "./ContactWrapper";

function Contact() {
  useEffect(() => {
    document.title = "NVT Trading-Contact Us";
  }, []);
  return (
    <>
    <Breadcrumb pageName = 'Contact Us' pageTitle = 'Contact Us '/>
    <ContactWrapper/>
    {/* <AboutUsCounter/>   */}
    </>
  );
}

export default Contact;
