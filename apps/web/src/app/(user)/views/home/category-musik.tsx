"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ICategoryMusikSectionProps {}

const CategoryMusikSection: React.FunctionComponent<
  ICategoryMusikSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [showLoadMoreMusik, setShowLoadMoreMusik] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventMusik = event.filter(
    (event: any) => event.category === "Musik",
  );
  const handleLoadMoreMusik = () => {
    const loadMoreMusik = event.filter(
      (event: any) => event.category === "Musik",
    );
    const newDisplayedEvents = displayedEvents + 5;
    setDisplayedEvents(newDisplayedEvents);
    if (newDisplayedEvents >= loadMoreMusik.length) {
      setShowLoadMoreMusik(false);
    }
  };
  const onHandleGet = async () => {
    try {
      const response = await axios.get("http://localhost:2000/event");
      setEvent(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Music</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Diskon 50% buat main musik bareng kita. 🎠
          </h1>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {filterEventMusik
            .slice(0, displayedEvents)
            .map((event: any, index: number) => (
              <div key={index}>
                <CardEvent
                  id={event.id}
                  judul={event.name}
                  lokasi={event.location}
                  waktu={event.createdAt}
                  harga={event.price}
                />
              </div>
            ))}
        </div>
        {showLoadMoreMusik && (
          <div className=" mx-auto flex">
            <Button
              className=" mx-auto h-[36px] w-[242px] bg-[#5CC8E4] text-[14px] text-white  md:h-[44px] "
              type="button"
              onClick={handleLoadMoreMusik}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryMusikSection;
