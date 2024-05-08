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
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { getUserEvents, getUserProfile } from "@/data/user";
import Cookies from "js-cookie";

interface IBayarPageProps {}

const BayarPage: React.FunctionComponent<IBayarPageProps> = (props) => {
  const [voucher, setVoucher] = React.useState<any[]>([]);
  const [dataProfile, setDataProfile] = React.useState<any>([]);
  // const [eventId, setEventId] = React.useState<string>(
  //   window.location.href.split("/")[4],
  // );
  React.useEffect(() => {
    getApiDetail();
  }, []);
  //Handle Get API Detail :
  const getApiDetail = async () => {
    try {
      const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      // let url = NEXT_PUBLIC_BASE_API_URL + `/user/profile`;
      // const response = await axios.get(url);
      setDataProfile(UserProfile.result);
      setVoucher(UserProfile.result.vouchers);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };
  return (
    <section className=" h-[1000px] bg-[#f4f7fe]">
      {/* <NavbarDesktop /> */}
      <div className=" block md:flex">
        <div className=" flex flex-col">
          <DesSection />
            <div className="mx-[10px] md:mx-0">
              <div className="ml-0 mt-[20px] h-auto w-full rounded-lg  bg-white shadow md:ml-[120px] md:h-auto md:w-[828px] md:px-[28px] md:py-[28px]">
                <div className="  flex justify-between">
                  <Select>
                    <SelectTrigger className="w-full md:w-[1000px]">
                      <div className=" flex space-x-4">
                        <FaTicketAlt className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                        <p className=" text-[12px] text-gray-500">
                          Pakai Voucher
                        </p>
                      </div>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {voucher.map((voucher: any) => (
                        <SelectItem key={voucher.id} value={voucher.name}>
                          Discount {voucher.discount}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          <RedeemPointSection />
          <PaymentSection />
        </div>
        <DetailOrder />
      </div>
    </section>
  );
};

export default BayarPage;
