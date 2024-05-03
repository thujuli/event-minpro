import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ButtonBeliDes from "../../_components/detail/buttonBeliDes";


interface ITiketProps {}

const Tiket: React.FunctionComponent<ITiketProps> = (props) => {
  const [jumlahTiket, setJumlahTiket] = React.useState(1);
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
  const countHarga = (counter: string) => {
    if (counter === "+") {
      return setJumlahTiket((state) => state + 1);
    } else {
      return setJumlahTiket((state) => (state - 1 === 0 ? 1 : state - 1));
    }
  };
  return (
    <section>
              <div className="w-full md:w-[784px] h-auto md:h-[300] mx-[0px] md:mx-[120px] p-[24px] ">
        <div className="mx-0 md:mx-[20px]">
          <h1 className="text-[18px] md:text-[24px] font-semibold">
            Pilih tiket
          </h1>
          <div className="my-[20px] md:my-[32px] w-full md:w-[704px] h-full md:h-[210px] border border-slate-400 rounded-xl px-[28px] py-[20px] ">
            <div className=" flex justify-between text-[14px] md:text-[16px]">
              <h1 className=" font-semibold">REGULAR</h1>
              <h1 className=" ">Jumlah Tiket</h1>
            </div>
            <div className=" mt-[10px] flex space-x-4 md:space-x-10   justify-end text-[14px] md:text-[16px]">
              <Button
                className=" w-[24px] h-[24px]  bg-white border border-gray-400 text-black rounded-2xl"
                type="button"
                onClick={() => countHarga("-")}
              >
                -
              </Button>
              <p>{jumlahTiket}</p>
              <Button
                className=" w-[24px] h-[24px]  bg-white border border-gray-400 text-black rounded-2xl"
                type="button"
                onClick={() => countHarga("+")}
              >
                +
              </Button>
            </div>
            <div className="">
              <h1 className=" text-[14px] md:text-[18px]">Price</h1>
              <h1 className=" text-[18px] md:text-[22px] text-[#FFA24B] font-semibold">
                IDR. {(event.price * jumlahTiket).toLocaleString()}
              </h1>
            </div>
            <div
              id="stroke"
              className=" border-[0.2px] md:border mt-[10px]"
            ></div>
            <div className=" flex justify-between py-[8px] text-[14px] md:text-[16px]">
              <p>
                Available Seat : {event.availableSeats}/{event.maxSeats}
              </p>
              <ButtonBeliDes />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tiket;