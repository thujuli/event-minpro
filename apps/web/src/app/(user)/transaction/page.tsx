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
import HeroDetails from "../views/detail-views/detail-hero";
import NavbarDesktop from "../views/navbar-desktop";
import DesSection from "../views/transaction/des-section";
import VoucherSection from "../views/transaction/voucher-section";
import RedeemPointSection from "../views/transaction/redeem-point";
import axios from "axios";
import PaymentSection from "../views/transaction/payment-section";
import DetailOrder from "../views/transaction/detail-order";

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
      const response = await axios.get(`http://localhost:2000/event/${4}`);
      console.log(response.data);
      setEvent(response.data);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section className=" h-[1000px] bg-[#f4f7fe]">
      {/* <NavbarDesktop /> */}
      <div className=" block md:flex">
        <div className=" flex flex-col">
          <DesSection />
          <VoucherSection />
          <RedeemPointSection />
          <PaymentSection/>
        </div>
        <DetailOrder/>
      </div>
    </section>
  );
};

export default BayarPage;
