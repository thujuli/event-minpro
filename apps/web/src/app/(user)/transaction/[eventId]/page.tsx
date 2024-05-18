"use client";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
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
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatDate, formatDateTime, formatNumber, formatPrice, numberShortener } from "@/lib/formatter";

interface IBayarPageProps {
  points: {
    balance: number;
  };
}

const BayarPage: React.FunctionComponent<IBayarPageProps> = () => {
  const id = useParams();
  const [totalPayment, setTotalPayment] = React.useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = React.useState<any>(null);
  const [dataProfile, setDataProfile] = React.useState<any[]>([]);
  const [event, setEvent] = React.useState<any>([]);
  const [voucher, setVoucher] = React.useState<any[]>([]);
  const [point, setPoint] = React.useState<number>(0);
  const [switchOn, setSwitchOn] = React.useState<boolean>(false);
  const [creatorVoucher, setCreatorVoucher] = React.useState<any>([]);
  const seatReq = localStorage.getItem("seat");
  const [dataTransaction, setDataTransaction] = React.useState<any>({
    seatRequests: Number(seatReq),
    redeemedPoints: 0,
    eventId: 0,
  });

  React.useEffect(() => {
    setDataTransaction((prev: any) => {
      const updatedTransaction = {
        ...prev,
        eventId: Number(id.eventId),
        redeemedPoints: switchOn ? point : 0,
      };

      if (selectedVoucher !== null) {
        updatedTransaction.voucherId = Number(selectedVoucher);
      } else {
        delete updatedTransaction.voucherId;
      }

      return updatedTransaction;
    });
  }, [selectedVoucher, switchOn, point]);

  console.log("cek data yang mau dikirim :", dataTransaction);

  // Handle getAPi user (data voucher, data point, voucher EO)
  const getApiDetail = async () => {
    try {
      const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${id.eventId}`;
      const response = await axios.get(url);
      let voucherAfterFilter = [];
      for (let i = 0; i < UserProfile.result.vouchers.length; i++) {
        if (
          UserProfile.result.vouchers[i].usage <
          UserProfile.result.vouchers[i].maxUsage
        ) {
          voucherAfterFilter.push(UserProfile.result.vouchers[i]);
        }
      }
      setEvent(response.data.result[0]);
      setTotalPayment(
        response.data.result[0].price * dataTransaction.seatRequests,
      );
      setVoucher(voucherAfterFilter);
      setPoint(UserProfile.result.point.balance);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  const onHandleVoucher = async () => {
    try {
      //CREATOR
      let creatorUrl =
        NEXT_PUBLIC_BASE_API_URL + `/vouchers/voucher-creator/${id.eventId}`;

      const creatorResponse = await axios.get(creatorUrl);
      let voucherAfterFilterCreator = [];

      for (let i = 0; i < creatorResponse.data.result.length; i++) {
        if (
          creatorResponse.data.result[i].usage <
          creatorResponse.data.result[i].maxUsage
        ) {
          voucherAfterFilterCreator.push(creatorResponse.data.result[i]);
        }
      }
      setCreatorVoucher(voucherAfterFilterCreator);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Voucher Select
  const handleSelectVoucher = (voucher: any) => {
    setSelectedVoucher(voucher ? Number(voucher) : null);
  };
  // Handle Switch Change
  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
  };

  // Handle total Front End
  let discount = (totalPayment * selectedVoucher) / 100;
  let points =
    point > totalPayment - discount ? totalPayment - discount : point;
  let handlePoint = switchOn ? points : 0;

  React.useEffect(() => {
    getApiDetail();
    onHandleVoucher();
  }, []);

  // handle Post Transaction
  const ticketBuy = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions`;

      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };
      const response = await axios.post(url, dataTransaction, config);
      localStorage.removeItem("seat");
    } catch (error) {
      console.log(error);
    }
  };

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
                    {creatorVoucher.map((voucher: any, index: number) => (
                      <SelectItem key={index} value={voucher.id}>
                        {voucher.name}
                      </SelectItem>
                    ))}
                    {voucher.map((voucher: any, index: number) => (
                      <SelectItem key={index} value={voucher.id}>
                        {voucher.name}
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
                    Redeem Point : {formatPrice(point)}
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
        <div className=" relative mx-[10px] flex flex-col md:mx-0 pb-[11vh] md:pb-0">
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
              <h1 className="text-[14px] text-black">
                {dataTransaction.seatRequests} Tiket
              </h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Tanggal dipilih</h1>
              <h1 className="text-[14px] text-black">
                {event.startDate}
              </h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Diskon</h1>
              <h1 className="text-[14px] text-black">
                {formatPrice(discount)}
              </h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Point dipakai</h1>
              <h1 className="text-[14px] text-black">
                {formatPrice(handlePoint)}{" "}
              </h1>
            </div>
            <div id="stroke" className=" mb-10 border "></div>
            <div className=" my-[16px] flex justify-between  text-[12px] text-gray-800">
              <p className=" font-semibold">Total Pembayaran</p>
              <p className=" text-[16px] font-semibold">
                {formatPrice(totalPayment - discount - handlePoint)}
              </p>
            </div>
            <div>
              <Button
                className="hidden h-[36px] w-full rounded-md  bg-[#53B253]  text-white md:block"
                type="button"
                onClick={ticketBuy}
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
            onClick={ticketBuy}
          >
            Beli Tiket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BayarPage;
