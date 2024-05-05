import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ButtonBeliDes from "../../_components/detail/button-buy-des";
import ButtonBeliMobile from "../../_components/detail/button-buy-mobile";

interface ITicketProps {}

const Ticket: React.FunctionComponent<ITicketProps> = (props) => {
  const [jumlahTiket, setJumlahTiket] = React.useState(1);
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
  const countHarga = (counter: string) => {
    if (counter === "+") {
      return setJumlahTiket((state) => state + 1);
    } else {
      return setJumlahTiket((state) => (state - 1 === 0 ? 1 : state - 1));
    }
  };
  return (
    <section className=" mt-[10px]">
      <div className="mx-[0px] h-auto w-full rounded-lg bg-white p-[20px] md:mx-[120px] md:h-[300] md:w-[784px] md:bg-[#f4f7fe] md:px-[28px] md:py-[28px]">
        <div className="mx-0  ">
          <h1 className="text-[18px] font-semibold md:text-[18px]">
            Pilih tiket
          </h1>
          <div className="my-[20px] h-full w-full rounded-xl border border-slate-400 bg-white px-[28px] py-[20px] md:my-[32px] md:h-[210px] md:w-[704px]">
            <div className=" flex justify-between text-[14px] md:text-[14px]">
              <h1 className=" font-semibold">REGULAR</h1>
              <h1 className=" text-[14px] ">Jumlah Tiket</h1>
            </div>
            <div className=" mt-[10px] flex justify-end space-x-4   text-[14px] md:space-x-10 md:text-[16px]">
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => countHarga("-")}
              >
                -
              </Button>
              <p className=" text-[14px]">{jumlahTiket}</p>
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => countHarga("+")}
              >
                +
              </Button>
            </div>
            <div className="">
              <h1 className=" text-[14px] md:text-[14px]">Price</h1>
              <h1 className=" text-[18px] font-semibold text-[#FFA24B] md:text-[16px]">
                IDR. {(event.price * jumlahTiket).toLocaleString()}
              </h1>
            </div>
            <div
              id="stroke"
              className=" mt-[10px] border-[0.2px] md:border"
            ></div>
            <div className=" flex items-center justify-between py-[18px] text-[14px] md:text-[14px]">
              <p>
                Available Seat : {event.availableSeats}/{event.maxSeats}
              </p>
              <ButtonBeliDes />
            </div>
          </div>
          <div className=" mx-[28px] md:hidden ">
            <ButtonBeliMobile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
