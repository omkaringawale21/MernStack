import React from "react";
import NavBar from "../Components/Navbar/NavBar";
import Banner from "../Components/Banner/Banner";
import Slider from "../Components/Slider/Slider";
import MultiProducts from "../Components/MultiProducts/MultiProducts";
import "../index.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Slider />
      <MultiProducts />
    </>
  );
};

export default Home;
