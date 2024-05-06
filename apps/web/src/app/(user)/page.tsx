import React from "react";
import Hero from "./views/hero";
import TopNews from "./views/home/top-news";
import CategoryMusikSection from "./views/home/category-musik";
import NavbarDesktop from "./views/navbar-desktop";
import AllEventSection from "./views/home/all-event";
import CategorySeminarSection from "./views/home/category-seminar";
import { Button } from "@/components/ui/button";
import CategorySection from "./views/home/category-hero-mobile";

const HomePage: React.FC = () => {
  return (
    <section>
      <NavbarDesktop />
      <Hero />
      <CategorySection />
      {/* <TopNews /> */}
      <CategoryMusikSection />
      <CategorySeminarSection />
      <AllEventSection />
    </section>
  );
};

export default HomePage;
