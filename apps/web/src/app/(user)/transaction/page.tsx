"use client";
import * as React from "react";
import { FaTicketAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCoins } from "react-icons/fa6";
import HeroDetails from "../views/detail-views/heroDetail";
import NavbarDesktop from "../views/navbarDesktop";
import DesSection from "../views/transaction/desSection";
import VoucherSection from "../views/transaction/voucherSection";
import RedeemPointSection from "../views/transaction/redeemPoint";
import PembayaranSection from "../views/transaction/pembayaranSection";
import axios from "axios";
import DetailPembayaran from "../views/transaction/detailPemesanan";

interface IBayarPageProps {}

const BayarPage: React.FunctionComponent<IBayarPageProps> = (props) => {
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
      const response = await axios.get(`http://localhost:8000/event/${4}`);
      console.log(response.data);
      setEvent(response.data);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section className=" h-[1000px] bg-[#f4f7fe]">
      {/* <NavbarDesktop /> */}
      <div className=" flex">
        <div className=" flex flex-col">
          <DesSection />
          <VoucherSection />
          {/* <RedeemPointSection />
          <PembayaranSection /> */}
        </div>
        {/* <DetailPembayaran /> */}
      </div>
    </section>
  );
};

export default BayarPage;
