"use client"
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {

  return (
    <section className=" w-full rounded-lg bg-white p-10">
      <div className=" flex- flex-col space-y-4">
        <div className=" flex  h-[400px] w-full flex-col bg-[url('https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/eventThirdParty/2023/11/08/7d96e971-58fe-415b-b1f8-cc199e5c439f-1699382201787-5ff27541a9b9e877c5d724d47ae891ec.jpg')] bg-cover bg-center "></div>
        <h1>Film Screening: Classic Movies</h1>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar 
              key={index}
              className="w-6 h-6"
            />
          ))}
        </div>
        <Textarea />
        <Button
          className="block h-[36px] w-[300px] rounded-md  bg-[#53B253]  text-white md:block"
          type="button"
        >
          Submit Review
        </Button>
      </div>
    </section>
  );
};

export default App;
