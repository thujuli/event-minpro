import * as React from "react";
import { Input } from "@/components/ui/input";
import SearchBar from "../_components/handle-seachbar";
import InputSearch from "../_components/search-bar";
import CategoryDesktop from "./home/category-hero-desktop";
interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <section>
      <div className="mx-auto flex h-[176px] w-full flex-col bg-[#5CC8E4] bg-[url('https://www.indonesia.travel/content/dam/indtravelrevamp/microsite-event/plan-your-trip/event-musik.jpg')] bg-cover bg-center md:h-[434px]">
        <h2 className="mx-auto mt-[80px] text-[22px] italic text-white md:mt-[120px]">
          Hai kamu, <span className=" font-bold">mau cari tiket apa?</span>
        </h2>
        <InputSearch />
        <CategoryDesktop />
      </div>
    </section>
  );
};

export default Hero;
