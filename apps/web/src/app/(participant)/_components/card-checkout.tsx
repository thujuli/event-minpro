import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonBeliDes from "@/app/(user)/_components/detail/button-buy-des";
import { formatDate, numberShortener } from "@/lib/formatter";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface ICardCheckoutProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardCheckout: React.FunctionComponent<ICardCheckoutProps> = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  return (
    <div
      className="h-[298px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden  rounded-lg border border-gray-400 bg-white md:h-[308px] md:min-w-[236px] md:max-w-[236px]"
      // onClick={() => router.push(`/detail/${props.id}`)}
    >
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
          {props.harga === 0 ? "Free" : `IDR. ${numberShortener(props.harga)}`}
        </h1>
        {/* BUTTON REVIEW */}
        <Button
          className="w-full p-0 text-[12px] mt-[16px]"
          onClick={handleShowConfirmationModal}
        >
          Konfimasi sudah bayar
        </Button>
      </div>
      {/* Modal Konfirmasi */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-lg bg-white p-8">
            <p>Apakah Anda yakin sudah melakukan pembayaran?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <Input placeholder="0" type="file" />
              <Button>Ya</Button>
              <Button onClick={handleCloseConfirmationModal}>Batal</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardCheckout;
