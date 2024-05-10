import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ButtonBeliDes from "@/app/(user)/_components/detail/button-buy-des";

interface ICardCheckoutProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: string;
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
      className="h-[278px] min-w-[188px] max-w-[188px] cursor-pointer overflow-hidden  rounded-lg border border-gray-400 bg-white md:h-[338px] md:min-w-[236px] md:max-w-[236px]"
      // onClick={() => router.push(`/detail/${props.id}`)}
    >
      <Image
        className="h-[144px] w-[188px] md:h-[148px] md:w-[236px] "
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
        <h1 className="  mt-[4px]  text-[10px]">{props.waktu}</h1>
        <h1 className="  mt-[4px]  text-[10px]">
          IDR. {props.harga.toLocaleString()}
        </h1>
        {/* BUTTON REVIEW */}
        <Button className="w-full md:mt-[48px] " onClick={handleShowConfirmationModal}>Konfimasi sudah bayar</Button>
      </div>
       {/* Modal Konfirmasi */}
       {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Apakah Anda yakin sudah melakukan pembayaran?</p>
            <div className="flex justify-center space-x-4 mt-4">
              {/* TINGGAL BUTTON YA NYA KASIH FUNCTION BUAT NGIRIM AXIOS */}
              <Button  >Ya</Button>
              <Button onClick={handleCloseConfirmationModal}>Batal</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardCheckout;
