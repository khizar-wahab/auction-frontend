import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/App";
import MainLayout from "./components/layout/MainLayout";
import Contact from "./components/page/contact/Contact";
import BuyBids from "./components/page/bids/BuyBids";
import ErrorPage from "./components/page/error/ErrorPage";
import SignUp from "./components/page/signUp/SignUp";
import Faq from "./components/page/faq/Faq";
import "./index.css"
import Login from "./components/page/login/Login";
import AuctionDetails from "./components/page/auctionDetails/AuctionDetails";
import Dashboard from "./components/page/dashboard/Dashboard";
import Blog from "./components/page/blog/Blog";
import BlogDetails from "./components/page/BlogDetails/BlogDetails";
import LiveAuction from "./components/page/LiveAuction.jsx/LiveAuction";
import HowItWork from "./components/page/howItWork/HowItWork";
import About from "./components/page/about/About";
import Layout2 from "./components/layout/Layout2";
import Layout3 from "./components/layout/Layout3";
import Merchant from "./components/page/joinMerchant/Merchant";
import Page from "./components/page/page/page";
import Success from "./components/page/Success";
import Cancel from "./components/page/Cancel";
import ForgetPassword from "./components/page/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/page/ForgetPassword/ResetPassword";
import "bootstrap";

const components = [
  { path: "/", component: <MainLayout/> },
  { path: "/index2", component: <Layout2 /> },
  { path: "/index3", component: <Layout3 /> },
  { path: "/page/:slug", component: <Page /> },
  { path: "/about", component: <About /> },
  { path: "/buyBids", component: <BuyBids /> },
  { path: "/contact", component: <Contact /> },
  { path: "/error", component: <ErrorPage /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/login", component: <Login /> },
  { path: "/forget-password", component: <ForgetPassword /> },
  { path: "/reset-password", component: <ResetPassword /> },
  { path: "/auction-details/:id?", component: <AuctionDetails /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/blog", component: <Blog /> },
  { path: "/blog-details/:id", component: <BlogDetails /> },
  { path: "/live-auction", component: <LiveAuction /> },
  { path: "/how-works", component: <HowItWork /> },
  { path: "/faq", component: <Faq /> },
  { path: "/join-merchant", component: <Merchant /> },
  { path: "/success", component: <Success /> },
  { path: "/cancel", component: <Cancel /> },
];

const Root = () => {
  window.process = { env: { PUBLIC_URL: window.location.origin } };

  return (
    <BrowserRouter basename="/">
      <Routes>
        {components.map((route, index) => (
          <Route key={index} exact path={route.path} element={<Layout cc={route.component} /> } />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Root />
);
