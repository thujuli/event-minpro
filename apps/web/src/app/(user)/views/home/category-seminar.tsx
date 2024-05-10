"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";

interface ICategorySeminarSectionProps {}

const CategorySeminarSection: React.FunctionComponent<
  ICategorySeminarSectionProps
> = (props) => {
  const [activeButton, setActiveButton] = React.useState("Online");
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [showLoadMoreSeminar, setShowLoadMoreSeminar] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=4";
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const filterEventSeminar = event.filter(
    (event: any) => (event.categoryId = 4),
  );
  const handleLoadMoreSeminar = () => {
    const loadMoreSeminar = event.filter(
      (event: any) => (event.categoryId = 4),
    );
    const newDisplayedEvents = displayedEvents + 5;
    setDisplayedEvents(newDisplayedEvents);
    if (newDisplayedEvents >= loadMoreSeminar.length) {
      setShowLoadMoreSeminar(false);
    }
  };
  return (
    <section className="bg-[#f4f7fe] py-[10px]">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">
            Workshop & Seminar
          </h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main Seminar bareng kita. 🎠
          </h1>
        </div>
        <div className="mt-[10px] space-x-4">
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
            type="button"
            onClick={(element: any) => {
              // const newData = {
              //   ...getData,
              //   category: ""
              // };
              // setGetData(newData);
              setActiveButton("Online");
            }}
          >
            Online
          </Button>
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Jawa Barat" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
            type="button"
            onClick={(element: any) => {
              // const newData = {
              //   ...getData,
              //   category: "Seminar"
              // };
              // setGetData(newData);
              setActiveButton("Seminar");
            }}
          >
            Jawa Barat
          </Button>
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Jawa Timur" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
            type="button"
            onClick={(element: any) => {
              // const newData = {
              //   ...getData,
              //   category: "Webinar"
              // };
              // setGetData(newData);
              setActiveButton("Jawa Timur");
            }}
          >
            Jawa Timur
          </Button>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5 ">
          {filterEventSeminar
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
        {showLoadMoreSeminar && (
          <div className=" mx-auto flex">
            <Button
              className=" mx-auto h-[36px] w-[242px] bg-[#5CC8E4] text-[14px] text-white  md:h-[44px] "
              type="button"
              onClick={handleLoadMoreSeminar}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySeminarSection;
