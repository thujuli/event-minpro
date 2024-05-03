"use client";
import * as React from "react";
import ButtonBeliMobile from "../../_components/detail/buttonBeliMobile";
import Rekomendasi from "../../views/recomend";
import HeroDetails from "../../views/detail_views/heroDetail";
import DeskripsiDetail from "../../views/detail_views/deksripsiDetail";
import MainDeskripsi from "../../views/detail_views/mainDeskripsi";
import Tiket from "../../views/detail_views/tiket";
import SearchBar from "../../_components/handleSeachBar";
import NavbarDesktop from "../../views/navbarDesktop";

interface IDetailEventProps {}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  return (
    <section>
      <NavbarDesktop/>
      <HeroDetails/>
      <DeskripsiDetail/>
      <MainDeskripsi/>
      <Tiket/>
      <div className=" block md:hidden mx-[28px] mb-10">
        <ButtonBeliMobile />
      </div>
      <div className="mx-[20px] md:mx-[120px]">
        <Rekomendasi />
      </div>
    </section>
  );
};
export default DetailEvent;
