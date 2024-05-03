import * as React from "react";
import { useRouter } from "next/navigation";

interface ICardSearchProps {
  id?: number;
  gambar?: string;
  judul: string;
  lokasi: string;
}

const CardSearch: React.FunctionComponent<ICardSearchProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className="min-w-[306px] max-w-[306px] md:min-w-[306px] md:max-w-[306px]  h-[68px]  border border-gray-400 rounded-lg overflow-hidden cursor-pointer flex p-[12px]"
      onClick={() => router.push(`/detail/${props.id}`)}
    >
      <img className="w-[40px]  h-[40px] " src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2021/12/08/d408eb52-5459-41b7-b136-455bf66b4874-1638949824913-fb6a74fe056f99f3d4c0ecd9cb50a2e4.jpg" alt="" />
      <div className=" mx-[6px] max-w-[236px]">
        <h1 className="  text-[12px] md:text-[14px]  font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
          {props.judul}
        </h1>
        <h1 className="  text-[10px]  ">{props.lokasi}</h1>
      </div>
    </div>
  );
};

export default CardSearch;
