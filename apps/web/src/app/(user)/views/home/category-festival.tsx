"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";

interface ICategoryFestivalSectionProps {}

const CategoryFestivalSection: React.FunctionComponent<
  ICategoryFestivalSectionProps
> = (props) => {
  const [event, setEvent] = React.useState<any[]>([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [showLoadMoreFestival, setShowLoadMoreFestival] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventFestival = event.filter(
    (event: any) => event.categoryId === 1,
  );
  const handleLoadMoreFestival = () => {
    const loadMoreFestival = event.filter(
      (event: any) => event.categoryId === 1,
    );
    const newDisplayedEvents = displayedEvents + 5;
    setDisplayedEvents(newDisplayedEvents);
    if (newDisplayedEvents >= loadMoreFestival.length) {
      setShowLoadMoreFestival(false);
    }
  };
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=1";
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
          <h1 className=" text-[14px] font-semibold md:text-[24px]">
            Festival
          </h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main Festival bareng kita. 🎠
          </h1>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {filterEventFestival
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
        {showLoadMoreFestival && (
          <div className=" mx-auto flex">
            <Button
              className=" mx-auto h-[36px] w-[242px] bg-[#5CC8E4] text-[14px] text-white  md:h-[44px] "
              type="button"
              onClick={handleLoadMoreFestival}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryFestivalSection;
