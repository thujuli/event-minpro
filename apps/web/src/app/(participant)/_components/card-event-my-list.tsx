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

const CardEventMyList: React.FunctionComponent<ICardEventMyListProps> = (
  props,
) => {
  return (
    <Link href={`/review/${props.id}`}>
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
          <h1 className=" text-[10px] font-semibold  text-green-700 md:mt-[58px] md:text-[14px]   ">
            Sudah Bayar
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardEventMyList;
