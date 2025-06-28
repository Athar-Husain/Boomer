import { useState } from "react";
import "./App.css";
import Spinner from "./utils/Spinner";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import './styles/css/bootstrap.min.css'
import './styles/css/style.css'

function App() {

  return (
    <>
      {/* <Spinner /> */}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
