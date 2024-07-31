import React from "react";

import { useState, Suspense, lazy } from "react";

import NavBar from './LandingPage/NavBar';
import Footer from './LandingPage/Footer';
import Content from './LandingPage/Content';

// const NavBar = lazy(() => import("./LandingPage/NavBar"));
// const Footer = lazy(() => import("./LandingPage/Footer"));
// const Content = lazy(() => import("./LandingPage/Content"));

function LandingPage() {
  return (
    <>
      <Suspense fallback='Loading...'>
        <NavBar />
      </Suspense>
      <Suspense fallback='Loading...'>
        <Content />
      </Suspense>
      <Suspense fallback='Loading...'>
        <Footer />
      </Suspense>
    </>
  );
}

export default LandingPage;
