"use client"
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/cardEventPromo";
import CardEvent from "../../_components/cardEvent";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ICategoryMusikSectionProps {}

const CategoryMusikSection: React.FunctionComponent<ICategoryMusikSectionProps> = (props) => {
const [event, setEvent] = React.useState([]);
    React.useEffect(() => {
      onHandleGet();
    }, []);
const [showLoadMoreMusik, setShowLoadMoreMusik] = React.useState(true);
const [displayedEvents, setDisplayedEvents] = React.useState(5);
const filterEventMusik = event.filter(
        (event: any) => event.category === "Musik"
      );
      const handleLoadMoreMusik = () => {
        const loadMoreMusik = event.filter(
          (event: any) => event.category === "Musik"
        );
        const newDisplayedEvents = displayedEvents + 5;
        setDisplayedEvents(newDisplayedEvents);
        if (newDisplayedEvents >= loadMoreMusik.length) {
          setShowLoadMoreMusik(false);
        }
      };
      const onHandleGet = async () => {
        try {
          const response = await axios.get("http://localhost:8000/event");
          setEvent(response.data);
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <section>
        <div className=" my-[26px] mx-[20px] md:mx-[100px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] md:text-[24px] font-semibold">Music</h1>
          <h1 className=" mt-[4px] md:mt-[14px] text-[12px] md:text-[14px] ">
            Diskon 50% buat main musik bareng kita. 🎠
          </h1>
        </div>
        <div className="flex md:grid md:grid-cols-5 overflow-hidden overflow-x-auto gap-4 my-[18px]">
          {filterEventMusik
            .slice(0, displayedEvents)
            .map((event: any, index:number) => (
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
          <div className=" flex mx-auto">
            <Button
              className=" w-[242px] h-[36px] md:h-[44px] text-[14px] mx-auto bg-[#5CC8E4]  text-white "
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