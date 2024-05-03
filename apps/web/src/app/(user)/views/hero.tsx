import * as React from "react";
import { Input } from "@/components/ui/input";
interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <section>
      <div className="w-full h-[176px] md:h-[434px] bg-[#5CC8E4] flex flex-col mx-auto bg-[url('https://www.indonesia.travel/content/dam/indtravelrevamp/microsite-event/plan-your-trip/event-musik.jpg')] bg-cover bg-center">
        <h2 className="mx-auto text-white mt-[80px] text-[22px] italic">
          Hai kamu, <span className=" font-bold">mau cari tiket apa?</span>
        </h2>
        <Input
          className="w-[300px] h-[36px] mt-[10px] mx-auto"
          type="text"
          placeholder="Cari eventMu"
        />
      </div>
    </section>
  );
};

export default Hero;