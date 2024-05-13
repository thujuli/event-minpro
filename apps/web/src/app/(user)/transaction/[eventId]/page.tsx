"use client";
import * as React from "react";
import { FaTicketAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCoins } from "react-icons/fa6";
import DesSection from "../../views/transaction/des-section";
import axios from "axios";
import PaymentSection from "../../views/transaction/payment-section";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface IBayarPageProps {
  points: {
    balance: number;
  };
}

const BayarPage: React.FunctionComponent<IBayarPageProps> = () => {
  // Voucher EO (Belum)
  const [totalPayment, setTotalPayment] = React.useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = React.useState<any>(null);
  const [dataProfile, setDataProfile] = React.useState<any[]>([]);
  const [event, setEvent] = React.useState<any>([]);
  const [voucher, setVoucher] = React.useState<any[]>([]);
  const [point, setPoint] = React.useState<number>(0);
  const [switchOn, setSwitchOn] = React.useState<boolean>(false);
  const [eventId, setEventId] = React.useState<string>(
    window.location.href.split("/")[4],
  );
  React.useEffect(() => {
    getApiDetail();
    countTotalPayment();
  }, [event.price, selectedVoucher, switchOn]);
  // Handle getAPi
  const getApiDetail = async () => {
    try {
      const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${eventId}`;
      const response = await axios.get(url);
      setEvent(response.data.result[0]);
      setDataProfile(UserProfile.result);
      setVoucher(UserProfile.result.vouchers);
      setPoint(UserProfile.result.point.balance);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };
  //Handle Voucher Select
  const handleSelectVoucher = (voucher: any) => {
    setSelectedVoucher(voucher);
  };
  // Handle Switch Change
  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
  };

  // Handle total Discount
  let discount = (event.price * selectedVoucher) / 100;

  // Handle Total
  const countTotalPayment = () => {
    let total = event.price;

    if (selectedVoucher) {
      total -= (event.price * selectedVoucher) / 100;
    }

    if (switchOn) {
      total -= point;
    }

    total = total >= 0 ? total : 0;
    setTotalPayment(total);
  };
  console.log(dataProfile);

  return (
    <section className="  h-[1000px] bg-[#f4f7fe]">
      {/* <NavbarDesktop /> */}
      <div className=" block md:flex">
        <div className=" flex flex-col">
          <DesSection />
          <div className="mx-[10px] md:mx-0">
            <div className="ml-0 mt-[20px] h-auto w-full rounded-lg  bg-white shadow md:ml-[120px] md:h-auto md:w-[828px] md:px-[28px] md:py-[28px]">
              <div className="  flex justify-between">
                <Select onValueChange={(e) => handleSelectVoucher(e)}>
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
                    {/* MAPPING VOUCHER DARI EONYA */}
                    {voucher.map((voucher: any) => (
                      <SelectItem key={voucher.id} value={voucher.discount}>
                        Discount {voucher.discount}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* <RedeemPointSection /> */}
          <div className="mx-[10px] md:mx-0">
            <div className="ml-0 mt-[20px] w-full rounded-lg bg-white p-3 shadow md:ml-[120px] md:h-auto md:w-[828px] md:p-0 md:px-[28px] md:py-[28px]">
              <div className=" flex justify-between ">
                <div className=" flex items-center space-x-4">
                  <FaCoins className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className=" text-[12px] text-gray-500">
                    Redeem Point : IDR. {point}
                  </p>
                </div>
                <Switch
                  checked={switchOn}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
          </div>
          <PaymentSection />
        </div>
        {/* <DetailOrder /> */}
        <div className=" relative flex flex-col">
          <div className="ml-0 mt-[24px] h-auto w-full rounded-lg bg-white  p-[20px] shadow md:fixed md:ml-[48px]  md:h-auto md:w-[392px]">
            <div className=" flex">
              <Image
                className="h-[40px] w-[40px] rounded-md "
                src={event.imageURL}
                width={236}
                height={148}
                alt=""
              />
              <div className="flex items-center overflow-hidden  overflow-ellipsis whitespace-nowrap px-2">
                <p className=" text-[14px] font-semibold">{event.name}</p>
              </div>
            </div>
            <div id="stroke" className=" mt-[10px] border"></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>REGULAR</h1>
              <h1 className="text-[14px] text-black">1 Tiket</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Tanggal dipilih</h1>
              <h1 className="text-[14px] text-black">{event.startDate}</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Diskon</h1>
              <h1 className="text-[14px] text-black">IDR. {discount}</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Point dipakai</h1>
              <h1 className="text-[14px] text-black">
                IDR.{" "}
                {switchOn
                  ? point >= event.price
                    ? event.price - discount
                    : event.price - point - discount
                  : 0}
              </h1>
            </div>
            <div id="stroke" className=" mb-10 border "></div>
            <div className=" my-[16px] flex justify-between  text-[12px] text-gray-800">
              <p className=" font-semibold">Total Pembayaran</p>
              <p className=" text-[16px] font-semibold">IDR. {totalPayment}</p>
            </div>
            <div>
              <Button
                className="hidden h-[36px] w-full rounded-md  bg-[#53B253]  text-white md:block"
                type="button"
              >
                Beli Tiket
              </Button>
            </div>
          </div>
        </div>
        {/* <DetailOrder /> */}
        <div className=" fixed  bottom-0  h-[10vh] w-full bg-gradient-to-r from-white to-lime-500  md:hidden ">
          <h1 className=" text-center text-[12px]  font-semibold text-[#007cff]">
            Pake promo dan point biar lebih murah!
          </h1>
          <Button
            className=" h-[8vh] w-full  bg-[#53B253]  text-white md:hidden"
            type="button"
          >
            Beli Tiket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BayarPage;
