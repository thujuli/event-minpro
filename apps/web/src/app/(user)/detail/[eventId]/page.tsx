"use client";
import * as React from "react";
import ButtonBeliMobile from "../../_components/detail/buttonBeliMobile";
import Rekomendasi from "../../views/recomend";
import HeroDetails from "../../views/detail-views/heroDetail";
import DeskripsiDetail from "../../views/detail-views/deksripsiDetail";
import MainDeskripsi from "../../views/detail-views/mainDeskripsi";
import Tiket from "../../views/detail-views/tiket";
import SearchBar from "../../_components/handleSeachBar";
import NavbarDesktop from "../../views/navbarDesktop";

interface IDetailEventProps {}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  return (
    <section className="bg-[#f4f7fe] md:bg-white ">
      <NavbarDesktop/>
      <HeroDetails />
      <DeskripsiDetail />
      <MainDeskripsi />
      <Tiket />
      {/* <div className=" md:hidden mx-[28px]  bg-red-500">
        <ButtonBeliMobile />
      </div> */}
      <div className="mx-0 md:mx-[120px]">
        <Rekomendasi />
      </div>
    </section>
  );
};
export default DetailEvent;
