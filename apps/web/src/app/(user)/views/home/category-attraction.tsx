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
  const [event, setEvent] = React.useState<any>([]);
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
    } catch (err) {
      console.log(err);
    }
  };
  const filterEventAttraction = event.filter(
    (event: any) => (event.categoryId = 6),
  );

  return (
    <section
      id="attraction"
      className="bg-[url('https://asset.gecdesigns.com/img/wallpapers/fairytale-valley-at-night-glowing-flowers-nature-wallpaper-sr10012422-1706504489805-cover.webp')]  bg-cover bg-center py-[10px]"
    >
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold text-white md:text-[24px]">
            Attraction
          </h1>
          <h1 className=" mt-[4px] text-[12px] text-white md:mt-[14px] md:text-[14px]">
            Petualangan Seru Menunggu di Setiap Sudut! 🎡
          </h1>
        </div>
        <div className=" flex items-center justify-between">
          <div className="mt-[10px] hidden space-x-4 md:block">
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
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Balikpapan" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  locationId: 364,
                };
                setGetData(newData);
                setActiveButton("Balikpapan");
              }}
            >
              Balikpapan
            </Button>
          </div>
          <Link href={`/explore`}>
            <Button
              className={`hidden h-[30px] w-auto rounded-md border  bg-white px-4 text-black md:block`}
              type="button"
            >
              Explore Lebih Banyak
            </Button>
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
                  harga={ event.price}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryAttractionSection;
