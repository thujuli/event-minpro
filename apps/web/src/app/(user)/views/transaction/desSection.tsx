"use client"
import * as React from "react";
interface IDesSectionProps {}
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";

const DesSection: React.FunctionComponent<IDesSectionProps> = (props) => {
  const [event, setEvent] = React.useState<any>([]);
  React.useEffect(() => {
    getApiDetail();
  }, []);
      //Handle Get API Detail :
  const getApiDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/event/${1}`
      );
      console.log(response.data);
      setEvent(response.data);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section>
      <div className="  mt-[24px] mx-[10px] md:ml-[120px] space-y-2">
        <h1 className=" font-bold text-[18px] ">Detail Acara</h1>
        <p className=" text-gray-500 text-[14px]">Isi formulir ini dengan benar karena e-tiket akan dikirim ke alamat email sesuai data pemesan.</p>
      </div>
            <div className="relative md:static top-[-40px] mt-[24px] mx-[10px] md:ml-[120px] w-[360px] md:w-[828px] h-auto   rounded-lg p-[20px] md:py-[28px] md:px-[28px] shadow bg-white ">
            <h1 className="text-[22px] md:text-[24px] font-semibold text-center md:text-left">
              {event.name}
            </h1>
            <div className=" mt-[38px] space-y-[14px]">
              <div className=" flex items-center">
                <IoLocationSharp className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[12px]">
                  {event.location}
                </p>
              </div>
              <div className=" flex items-center">
                <MdOutlineDateRange className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[12px]">
                {event.createdAt}
                </p>
              </div>
              <div className=" flex items-center">
                <BiBookmarks className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[12px]">
                {event.category}
                </p>
              </div>
              <div className=" flex items-center">
                <MdGroups3 className=" w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                <p className="mx-[12px] md:mx-[30px] text-[14px] md:text-[12px]">
                  Diselenggarakan oleh :{" "}
                  <span className=" font-semibold">FLASHBACK Motion</span>
                </p>
              </div>
            </div>
          </div>
    </section>
  );
};

export default DesSection;