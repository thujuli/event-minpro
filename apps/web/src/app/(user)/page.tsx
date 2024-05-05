import React from "react";
import Hero from "./views/hero";
import TopNews from "./views/home/topnews";
import CategoryMusikSection from "./views/home/categoryMusik";
import NavbarDesktop from "./views/navbarDesktop";
import AllEventSection from "./views/home/all-event";
import CategorySeminarSection from "./views/home/category-seminar";
import { Button } from "@/components/ui/button";
import CategorySection from "./views/home/category-hero-mobile";
import CategoryDesktop from "./views/home/category-hero-desktop";

const HomePage: React.FC = () => {
  return (
    <section>
      <NavbarDesktop />
      <Hero />

      <CategorySection/>
      <TopNews />
      <CategoryMusikSection />
      <CategorySeminarSection />
      <AllEventSection />
    </section>
  );
};

export default HomePage;
