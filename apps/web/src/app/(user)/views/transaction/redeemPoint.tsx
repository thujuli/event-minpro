import * as React from "react";
import { FaCoins } from "react-icons/fa6";


interface IRedeemPointSectionProps {}

const RedeemPointSection: React.FunctionComponent<IRedeemPointSectionProps> = (props) => {
  
  return (
    <section>
        <div className="mt-[20px] shadow bg-white w-[828px] h-[120px] ml-[120px] rounded-lg md:py-[28px] md:px-[28px] md:h-auto">
            <div className=" flex justify-between">
              <div className=" flex space-x-4 items-center">
                <FaCoins className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#aeb2be]" />
                <p className=" text-gray-500 text-[12px]">Redeem Point</p>
              </div>
              {/* <Switch /> */}
            </div>
          </div>
    </section>
  );
};

export default RedeemPointSection;