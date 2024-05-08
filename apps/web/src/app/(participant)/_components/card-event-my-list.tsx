import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ICardEventMyListProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: string;
}

const CardEventMyList: React.FunctionComponent<ICardEventMyListProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className="min-w-[188px] max-w-[188px] md:min-w-[236px] md:max-w-[236px] bg-white  h-[278px] md:h-[338px] border border-gray-400 rounded-lg overflow-hidden cursor-pointer"
      onClick={() => router.push(`/detail/${props.id}`)}
    >
      <Image className="w-[188px] md:w-[236px] h-[144px] md:h-[148px] "
        src={props.urlImage} 
        width={236}
        height={148}
        alt="" />

      <div className="mt-[8px] mx-[8px] md:mx-[12px] flex flex-col">
        <h1 className="  text-[12px] md:text-[14px]  font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
          {props.judul}
        </h1>
        <h1 className="  text-[10px]  mt-[10px]">{props.lokasi}</h1>
        <h1 className="  text-[10px]  mt-[4px]">{props.waktu}</h1>
        <h1 className="  text-[10px]  mt-[4px]">IDR. {(props.harga).toLocaleString()}</h1>
        <h1 className=" md:mt-[58px] text-green-700  text-[10px] md:text-[14px] font-semibold   ">
          Sudah Bayar
        </h1>
      </div>
    </div>
  );
};

export default CardEventMyList;
