"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Link from "next/link";

interface ICategoryAttractionSectionProps {}

const CategoryAttractionSection: React.FunctionComponent<
  ICategoryAttractionSectionProps
> = (props) => {
  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    locationId: 0,
  });
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, [getData]);
  const [showLoadMoreAttraction, setShowLoadMoreAttraction] =
    React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/events?categoryId=6`;
      if (getData.locationId) {
        url += `&locationId=${getData.locationId}`;
      }
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const filterEventAttraction = event.filter(
    (event: any) => (event.categoryId = 6),
  );
  // const handleLoadMoreAttraction = () => {
  //   const loadMoreAttraction = event.filter(
  //     (event: any) => (event.categoryId = 6),
  //   );
  //   const newDisplayedEvents = displayedEvents + 5;
  //   setDisplayedEvents(newDisplayedEvents);
  //   if (newDisplayedEvents >= loadMoreAttraction.length) {
  //     setShowLoadMoreAttraction(false);
  //   }
  // };
  return (
    <section className="bg-[#f4f7fe] py-[10px]">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">
            Workshop & Attraction
          </h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main Attraction bareng kita. 🎠
          </h1>
        </div>
        <div className=" flex items-center justify-between">
          <div className="mt-[10px] space-x-4">
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Online" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 0,
                };
                setGetData(newData);
                setActiveButton("Online");
              }}
            >
              Online
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Surabaya" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 265,
                };
                setGetData(newData);
                setActiveButton("Surabaya");
              }}
            >
              Surabaya
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Bogor" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 162,
                };
                setGetData(newData);
                setActiveButton("Bogor");
              }}
            >
              Bogor
            </Button>
          </div>
          <Link href={`/explore`}>
            <p className=" cursor-pointer text-[12px]">Explore lebih banyak</p>
          </Link>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5 ">
          {filterEventAttraction
            .slice(0, displayedEvents)
            .map((event: any, index: number) => (
              <div key={index}>
                <CardEvent
                  id={event.id}
                  judul={event.name}
                  lokasi={event.location.name}
                  waktu={event.endDate}
                  harga={event.price}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                />
              </div>
            ))}
        </div>
        {/* {showLoadMoreAttraction && (
          <div className=" mx-auto flex">
            <Button
              className=" mx-auto h-[36px] w-[242px] bg-[#5CC8E4] text-[14px] text-white  md:h-[44px] "
              type="button"
              onClick={handleLoadMoreAttraction}
            >
              Load more
            </Button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default CategoryAttractionSection;
