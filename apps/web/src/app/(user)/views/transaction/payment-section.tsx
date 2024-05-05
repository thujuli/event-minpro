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
interface IPaymentSectionProps {}

const PaymentSection: React.FunctionComponent<IPaymentSectionProps> = (props) => {
  return (
    <section className=" mx-[10px] md:mx-0">
          <div className="mt-[20px] shadow bg-white w-full md:w-[828px] h-auto ml-0 md:ml-[120px] rounded-lg md:py-[28px] md:px-[28px] md:h-auto">
            <div className=" flex justify-between">
              <Select>
                <SelectTrigger className="w-full md:w-[1000px]">
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

export default PaymentSection;