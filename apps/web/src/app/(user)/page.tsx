import React from "react";
import Hero from "./views/hero";
import TopNews from "./views/home/topnews";
import CategoryMusikSection from "./views/home/categoryMusik";
import NavbarDesktop from "./views/navbarDesktop";

const HomePage: React.FC = () => {
  return <section>
    {/* <NavbarDesktop/> */}
    <Hero/>
    <TopNews/>
    <CategoryMusikSection/>
  </section>;
};

export default HomePage;
