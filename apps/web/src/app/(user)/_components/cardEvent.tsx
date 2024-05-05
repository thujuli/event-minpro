import * as React from "react";
import { useRouter } from "next/navigation";

interface ICardEventProps {
  id?: number;
  urlImage?: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: string;
}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className="min-w-[188px] max-w-[188px] md:min-w-[236px] md:max-w-[236px] bg-white  h-[278px] md:h-[338px] border border-gray-400 rounded-lg overflow-hidden cursor-pointer"
      onClick={() => router.push(`/detail/${props.id}`)}
    >
      <img
        className="w-[188px] md:w-[236px] h-[144px]  md:h-[148px] "
        src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2024/01/22/d677985b-4e02-4ddf-8691-45949d188c1f-1705898674078-3a71f241f7f9b60d0e7930f2357eb3b5.jpg"
        alt=""
      />
      <div className="mt-[8px] mx-[8px] md:mx-[12px] flex flex-col">
        <h1 className="  text-[12px] md:text-[14px]  font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
          {props.judul}
        </h1>
        <h1 className="  text-[10px]  mt-[10px]">{props.lokasi}</h1>
        <h1 className="  text-[10px]  mt-[4px]">{props.waktu}</h1>
        <h1 className="  text-[10px] md:text-[12px] font-semibold  mt-[20px] md:mt-[40px] text-[#53B253]">
          Tersedia sekarang
        </h1>
        <h1 className="  text-[10px] md:text-[12px] font-semibold   ">
          IDR. {props.harga.toLocaleString()}
        </h1>
      </div>
    </div>
  );
};

export default CardEvent;
