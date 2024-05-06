import * as React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";


interface IDescriptionDetaillProps {}

const DescriptionDetaill: React.FunctionComponent<IDescriptionDetaillProps> = (
  props,
) => {
  const [event, setEvent] = React.useState<any>([]);
  const [eventId, setRventId] = React.useState<string>(
    window.location.href.split("/")[4],
  );
  React.useEffect(() => {
    getApiDetail();
  }, [eventId]);
  //Handle Get API Detail :
  const getApiDetail = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${eventId}`;
      const response = await axios.get(url);
      console.log(response.data.result[0]);
      setEvent(response.data.result[0]);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section>
      <div className="relative top-[-40px] mx-[10px] mt-[24px] h-auto w-[360px] rounded-lg border bg-white  p-[20px] shadow md:static md:mx-[120px] md:w-[1296px] md:border-none md:px-[28px] md:py-[28px]  md:shadow-none ">
        <h1 className="text-center text-[22px] font-semibold md:text-left md:text-[18px]">
          {event.name}
        </h1>
        <div className=" mt-[10px] space-y-[14px]">
          <div className=" flex items-center">
            <IoLocationSharp className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {event.location?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdOutlineDateRange className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {event.createdAt}
            </p>
          </div>
          <div className=" flex items-center">
            <BiBookmarks className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {event.category?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdGroups3 className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              Diselenggarakan oleh :{" "}
              <span className=" font-semibold">FLASHBACK Motion</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionDetaill;
