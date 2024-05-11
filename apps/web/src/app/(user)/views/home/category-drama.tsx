"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";

interface ICategoryDramaSectionProps {}

const CategoryDramaSection: React.FunctionComponent<
  ICategoryDramaSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [showLoadMoreDrama, setShowLoadMoreDrama] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventDrama = event.filter((event: any) => event.categoryId === 5);
  const handleLoadMoreDrama = () => {
    const loadMoreDrama = event.filter((event: any) => event.categoryId === 5);
    const newDisplayedEvents = displayedEvents + 5;
    setDisplayedEvents(newDisplayedEvents);
    if (newDisplayedEvents >= loadMoreDrama.length) {
      setShowLoadMoreDrama(false);
    }
  };
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=5";
      const response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Drama</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main Drama bareng kita. 🎠
          </h1>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {filterEventDrama
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
        {showLoadMoreDrama && (
          <div className=" mx-auto flex">
            <Button
              className=" mx-auto h-[36px] w-[242px] bg-[#5CC8E4] text-[14px] text-white  md:h-[44px] "
              type="button"
              onClick={handleLoadMoreDrama}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryDramaSection;
