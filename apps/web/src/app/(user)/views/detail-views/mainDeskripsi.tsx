import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/cardEventPromo";
import axios from "axios";
interface IMainDeskripsiProps {}

const MainDeskripsi: React.FunctionComponent<IMainDeskripsiProps> = (props) => {
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
    <div className="w-full md:w-[784px] h-[300] mx-[0px] md:mx-[120px] p-[20px] md:py-[28px] md:px-[28px] rounded-lg  md:mt-[10px] bg-white">
        <div className=" ">
          <h1 className="text-[18px]  font-semibold ">
            Deskripsi
          </h1>
          <p className="text-[14px] md:text-[14px] text-justify mt-[12px] md:mt-[10px]">
            {event.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainDeskripsi;