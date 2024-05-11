"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Link from "next/link";

interface ICategoryMusikSectionProps {}

const CategoryMusikSection: React.FunctionComponent<
  ICategoryMusikSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    locationId: 0,
  });
  React.useEffect(() => {
    onHandleGet();
  }, [getData]);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventMusik = event.filter((event: any) => event.categoryId === 2);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=2";
      if (getData.locationId) {
        url += `&locationId=${getData.locationId}`;
      }
      const response = await axios.get(url);
      setEvent(response.data.result);
      // console.log("HASIL RESPONSE DATA :",response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Concert</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main musik bareng kita. 🎠
          </h1>
        </div>
        <div className=" flex items-center justify-between">
          <div className="mt-[10px] space-x-4">
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 0,
                };
                setGetData(newData);
                setActiveButton("All");
              }}
            >
              All
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Jakarta" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 158,
                };
                setGetData(newData);
                setActiveButton("Jakarta");
              }}
            >
              Jakarta
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Denpasar" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 283,
                };
                setGetData(newData);
                setActiveButton("Denpasar");
              }}
            >
              Denpasar
            </Button>
          </div>
          <Link href={`/explore`}>
            <p className=" cursor-pointer text-[12px]">Explore lebih banyak</p>
          </Link>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {filterEventMusik
            .slice(0, displayedEvents)
            .map((event: any, index: number) => (
              <div key={index}>
                <CardEvent
                  id={event.id}
                  judul={event.name}
                  lokasi={event.location.name}
                  waktu={event.createdAt}
                  harga={event.price}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMusikSection;
