"use client";
import * as React from "react";
import ButtonBeliMobile from "../../_components/detail/button-buy-mobile";
import HeroDetails from "../../views/detail-views/detail-hero";
import SearchBar from "../../_components/handle-seachbar";
import NavbarDesktop from "../../views/navbar-desktop";
import DescriptionDetaill from "../../views/detail-views/detail-description";
import MainDescription from "../../views/detail-views/main-description";
import Ticket from "../../views/detail-views/ticket";
import Recomend from "../../views/recomend";

interface IDetailEventProps {}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  return (
    <section className="bg-[#f4f7fe] md:bg-white ">
      <NavbarDesktop />
      <HeroDetails />
      <DescriptionDetaill/>
      <MainDescription/>
      <Ticket/>
      {/* <div className=" md:hidden mx-[28px]  bg-red-500">
        <ButtonBeliMobile />
      </div> */}
      <div className="mx-0 md:mx-[120px]">
        {/* <Recomend/> */}
      </div>
    </section>
  );
};
export default DetailEvent;
