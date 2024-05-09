"use client";
import * as React from "react";
interface IDesSectionProps {}
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { url } from "inspector";


const DesSection: React.FunctionComponent<IDesSectionProps> = (props) => {
  const [event, setEvent] = React.useState<any>([]);
  const [eventId, setRventId] = React.useState<string>(
    window.location.href.split("/")[4],
  );
  React.useEffect(() => {
    getApiDetail();
  }, []);
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
    <section className="">
      <div className="  mx-[10px] mt-[24px] space-y-2  md:ml-[120px]">
        <h1 className=" text-[18px] font-bold ">Detail Acara</h1>
        <p className=" text-[14px] text-gray-500">
          Isi formulir ini dengan benar karena e-tiket akan dikirim ke alamat
          email sesuai data pemesan.
        </p>
      </div>
      <div className="relative  mx-[10px] mt-[24px] h-auto w-[360px] rounded-lg bg-white p-[20px]   shadow md:static md:ml-[120px] md:w-[828px] md:px-[28px] md:py-[28px] ">
        <h1 className="text-center text-[22px] font-semibold md:text-left md:text-[24px]">
          {event.name}
        </h1>
        <div className=" mt-[38px] space-y-[14px]">
          <div className=" flex items-center">
            <IoLocationSharp className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
              {event.location?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdOutlineDateRange className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
              {event.createdAt}
            </p>
          </div>
          <div className=" flex items-center">
            <BiBookmarks className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
              {event.category?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdGroups3 className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
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
