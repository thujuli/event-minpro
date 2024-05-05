import * as React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";

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
      const response = await axios.get(
        `http://localhost:2000/event/${eventId}`,
      );
      console.log(response.data);
      setEvent(response.data);
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
              {event.location}
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
              {event.category}
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
