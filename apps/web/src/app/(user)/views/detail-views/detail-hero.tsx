import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
interface IHeroDetailsProps {}

const HeroDetails: React.FunctionComponent<IHeroDetailsProps> = (props) => {
  return (
    <section>
      <div className="  mx-auto flex h-[250px] w-full  flex-col bg-[url('https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/eventThirdParty/2023/11/08/7d96e971-58fe-415b-b1f8-cc199e5c439f-1699382201787-5ff27541a9b9e877c5d724d47ae891ec.jpg')] bg-cover bg-center md:h-[555px] md:w-[1400px]"></div>
    </section>
  );
};

export default HeroDetails;
