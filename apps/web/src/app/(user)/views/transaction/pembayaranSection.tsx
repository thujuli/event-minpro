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
interface IPembayaranSectionProps {}

const PembayaranSection: React.FunctionComponent<IPembayaranSectionProps> = (props) => {
  return (
    <section>
          <div className="mt-[20px] shadow bg-white w-[828px] h-[120px] ml-[120px] rounded-lg md:py-[28px] md:px-[28px] md:h-auto">
            <div className=" flex justify-between">
              <Select>
                <SelectTrigger className="w-[1000px]">
                  <div className=" flex space-x-4">
                    <FaTicketAlt className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                    <p className="text-gray-500 text-[12px]">Metode Pembayaran</p>
                  </div>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="20persen">OVO</SelectItem>
                    <SelectItem value="21persen">Mandiri</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
    </section>
  );
};

export default PembayaranSection;