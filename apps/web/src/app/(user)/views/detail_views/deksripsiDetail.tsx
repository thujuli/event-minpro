import * as React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";

interface IDeskripsiDetailProps {}

const DeskripsiDetail: React.FunctionComponent<IDeskripsiDetailProps> = (props) => {
  const [event, setEvent] = React.useState<any>([]);
  const [eventId, setRventId] = React.useState<string>(
    window.location.href.split("/")[4]
  );
  React.useEffect(() => {
    getApiDetail();
  }, [eventId]);
      //Handle Get API Detail :
  const getApiDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/event/${eventId}`
      );
      console.log(response.data);
      setEvent(response.data);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section>
        <div className="relative md:static top-[-40px] mt-[24px] mx-[10px] md:mx-[120px] w-[360px] md:w-[1296px] h-auto  md:h-[306px]  rounded-lg p-[20px] md:p-[48px] border md:border-none shadow md:shadow-none bg-white ">
        <h1 className="text-[22px] md:text-[38px] font-semibold text-center md:text-left">
          {event.name}
        </h1>
        <div className=" mt-[38px] space-y-[14px]">
          <div className=" flex items-center">
            <IoLocationSharp className="w-[20px] md:w-[24px] h-[20px] md:h-[24px]" />
            <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[16px]">
              {event.location}
            </p>
          </div>
          <div className=" flex items-center">
            <MdOutlineDateRange className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px]" />
            <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[16px]">
              {event.createdAt}
            </p>
          </div>
          <div className=" flex items-center">
            <BiBookmarks className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px]" />
            <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[16px]">
              {event.category}
            </p>
          </div>
          <div className=" flex items-center">
            <MdGroups3 className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px]" />
            <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[16px]">
              Diselenggarakan oleh :{" "}
              <span className=" font-semibold">FLASHBACK Motion</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeskripsiDetail;