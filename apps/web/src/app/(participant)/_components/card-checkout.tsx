import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonBeliDes from "@/app/(user)/_components/detail/button-buy-des";
import { formatDate, formatPrice, numberShortener } from "@/lib/formatter";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ICardCheckoutProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardCheckout: React.FunctionComponent<ICardCheckoutProps> = (props) => {
  const [fileName, setFileName] = React.useState<File | null>(null);
  const [transactionsId, setTransactionsId] = React.useState(0);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const onHandleCheckout = async () => {
    try {
      const formData = new FormData();
      if (fileName) {
        formData.append("image", fileName);
      }
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/${props.id}`;

      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };

      const response = await axios.patch(url, formData, config);
      toast.success("Payment Success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log(error.response.data.message);
    }
  };
  console.log(props.id);

  return (
    <div className="h-[298px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden  rounded-lg border border-gray-400 bg-white md:h-[308px] md:min-w-[236px] md:max-w-[236px]">
      <Image
        className="h-[144px] w-[188px]  md:h-[148px] md:w-full"
        src={props.urlImage}
        width={236}
        height={148}
        alt=""
      />

      <div className="mx-[8px] mt-[8px] flex flex-col md:mx-[12px]">
        <h1 className="  overflow-hidden overflow-ellipsis  whitespace-nowrap text-[12px] font-bold md:text-[14px]">
          {props.judul}
        </h1>
        <h1 className="  mt-[10px]  text-[10px]">{props.lokasi}</h1>
        <h1 className="  mt-[4px]  text-[10px]">{formatDate(props.waktu)}</h1>
        <h1 className="  mt-[4px]  text-[10px]">
          {props.harga === 0 ? "Free" : `${formatPrice(props.harga)}`}
        </h1>
        {/* BUTTON REVIEW */}
        <Button
          className="mt-[16px] w-full p-0 text-[12px]"
          onClick={handleShowConfirmationModal}
        >
          Konfimasi sudah bayar
        </Button>
      </div>
      {/* Modal Konfirmasi */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 mx-[10px] flex w-fit items-center justify-center  md:w-full">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <p>Apakah Anda yakin sudah melakukan pembayaran?</p>
            <div className="mt-4  space-x-4">
              <Input
                placeholder="0"
                type="file"
                onChange={(e: any) => {
                  setFileName(e.target.files[0]);
                }}
              />
              <div className=" mt-4 flex justify-end space-x-4">
                <Button onClick={onHandleCheckout}>Ya</Button>
                <Button onClick={handleCloseConfirmationModal}>Batal</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CardCheckout;
