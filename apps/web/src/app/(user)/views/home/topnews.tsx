import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/cardEventPromo";
interface ITopNewsProps {}

const TopNews: React.FunctionComponent<ITopNewsProps> = (props) => {
  return (
    <section>
              <div className=" my-[10px] md:my-[20px] mx-[20px] md:mx-[140px] ">
        <div className=" flex justify-between">
          <h1 className=" text-[14px] md:text-[24px] font-semibold">
            Popolar Event
          </h1>
          {/* <h1 className=" text-[12px] md:hidden">Load More</h1> */}
        </div>
        <div className=" flex overflow-hidden space-x-[8px] md:space-x-[40px] my-[18px] md:my-[40px] ">
            <CardEventPromo/>
            <CardEventPromo/>
            <CardEventPromo/>
            <CardEventPromo/>
        </div>
      </div>
    </section>
  );
};

export default TopNews;