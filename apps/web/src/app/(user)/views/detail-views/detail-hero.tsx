import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import axios from "axios";
import Image from "next/image";

interface IHeroDetailsProps {
  data :{
    imageURL :string
  }
}

const HeroDetails: React.FunctionComponent<IHeroDetailsProps> = (props) => {
  return (
    <section>
      <Image className="bg-cover bg-center md:h-[555px] md:w-[1400px] mx-auto flex h-[250px] w-full  flex-col"
        src={props.data.imageURL} 
        width={555}
        height={1400}
        alt="" />
      
    </section>
  );
};

export default HeroDetails;
