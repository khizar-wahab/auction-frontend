import React, {useEffect} from "react";
import AboutUsCounter from "../../common/AboutUsCounter";
import Breadcrumb from "../../common/Breadcrumb";
import WhyCHooseUs from "../howItWork/WhyCHooseUs";
import AboutTestimonial from "./AboutTestimonial";
import WhoWeAreArea from "./WhoWeAreArea";
import TestimonialHome1 from '../home/TestimonialHome1'

function About() {
  useEffect(() => {
    document.title = "NVT Trading-About Us";
  }, []);
  return (
    <>
      <Breadcrumb pageName="About Us" pageTitle="About Us" />
      <WhoWeAreArea/>
      <WhyCHooseUs/>
      {/* <AboutTestimonial/> */}
      <TestimonialHome1/>
      {/* <AboutUsCounter/> */}
    </>
  );
}

export default About;
