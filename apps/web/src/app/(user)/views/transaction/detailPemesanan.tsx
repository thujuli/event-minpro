import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface IDetailPembayaranProps {}

const DetailPembayaran: React.FunctionComponent<IDetailPembayaranProps> = (props) => {
    const [event, setEvent] = React.useState<any>([]);
    const [eventId, setRventId] = React.useState<string>(
      window.location.href.split("/")[4]
    );
    React.useEffect(() => {
      getApiDetail();
    }, []);
        //Handle Get API Detail :
    const getApiDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/event/${4}`
        );
        console.log(response.data);
        setEvent(response.data);
      } catch (err) {
        console.log("Error fetching event data:", err);
      }
    };
  return (
    <section>
                <div className=" flex flex-col relative">
          <div className="fixed mt-[24px] w-[392px] h-[678px] md:h-auto  rounded-lg p-[20px] shadow bg-white ml-[48px]">
            <div className=" flex">
          <img className="w-[40px]  h-[40px] rounded-md " src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2021/12/08/d408eb52-5459-41b7-b136-455bf66b4874-1638949824913-fb6a74fe056f99f3d4c0ecd9cb50a2e4.jpg" alt="" />
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis  px-2 flex items-center">
            <p className=" font-semibold text-[14px]">{event.name}</p>
            </div>
            </div>
            <div id="stroke" className=" border mt-[10px]"></div>
            <div className="my-[24px] space-y-3  text-gray-800 text-[12px]" >
              <h1>REGULAR</h1>
              <h1 className="text-black text-[14px]">1 Tiket</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-gray-800 text-[12px]">
              <h1>Tanggal dipilih</h1>
              <h1 className="text-black text-[14px]">Sab, 8 Jun 2024</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className=" flex text-[12px] justify-between  text-gray-800 my-[16px]">
              <p className=" font-semibold">Total Pembayaran</p>
              <p className=" font-semibold text-[16px]">IDR. {event.price}</p>
            </div>
        <div>
      <Button
        className="hidden md:block w-full h-[36px]  bg-[#53B253]  text-white rounded-md"
        type="button"
      >
        Beli Tiket
      </Button>
    </div>
          </div>
        </div>
    </section>
  );
};

export default DetailPembayaran;