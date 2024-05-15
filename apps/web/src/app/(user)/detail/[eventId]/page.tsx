import * as React from "react";
import ButtonBeliMobile from "../../_components/detail/button-buy-mobile";
import HeroDetails from "../../views/detail-views/detail-hero";
import NavbarDesktop from "../../views/navbar-desktop";
import DescriptionDetaill from "../../views/detail-views/detail-description";
import MainDescription from "../../views/detail-views/main-description";
import Ticket from "../../views/detail-views/ticket";
import Recomend from "../../views/recomend";
import { getEventById } from "@/data/event";
import NavbarDetail from "../../views/navbar-detail";

interface IDetailEventProps {
  params: {
    eventId: number;
  };
}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = async ({
  params,
}: IDetailEventProps) => {
  const data = await getEventById(params.eventId);

  return (
    <section className="bg-[#f4f7fe] md:bg-white ">
      <NavbarDetail />
      <HeroDetails data={data} />
      <DescriptionDetaill data={data} />
      <MainDescription data={data} />
      <Ticket data={data} id={params.eventId} />
      <div className="mx-0 md:mx-[120px]">
        <Recomend />
      </div>
    </section>
  );
};
export default DetailEvent;
