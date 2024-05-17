"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardEventMyList from "../_components/card-event-my-list";
import CardBeforeReview from "../_components/card-after-event";
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
interface IMyEventListProps {}

const MyEventList: React.FunctionComponent<IMyEventListProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [eventFinish, setEventFinish] = React.useState([]);
  const [showOnGoing, setShowOnGoing] = React.useState(true);

  React.useEffect(() => {
    onHandleGetOnGoing();
    onHadnleGetFInish();
  }, [showOnGoing]);
  const onHandleGetOnGoing = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };

      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/success`;
      const response = await axios.get(url, config);

      setEvent(response.data.result.eventsSuccess);
      console.log("data event Success", response.data.result.eventsSuccess);
    } catch (err) {
      console.log(err);
    }
  };

  const onHadnleGetFInish = async () => {
    try {
      // Handle  Token
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/finish`;

      const response = await axios.get(url, config);
      setEventFinish(response.data.result.eventsSuccess);
      console.log("data event Finish", response.data.result[0].event);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOnGoing = () => {
    setShowOnGoing(true);
  };

  const handleShowCompleted = () => {
    setShowOnGoing(false);
  };
  return (
    <section>
      <div className="mx-10 flex justify-evenly">
        <button onClick={handleShowOnGoing} className="font-semibold">
          On Going
        </button>
        <button onClick={handleShowCompleted} className="font-semibold">
          Selesai
        </button>
      </div>
      <div className="my-[18px] grid grid-cols-2 gap-4 md:mx-10 md:grid-cols-4  md:p-6">
        {showOnGoing
          ? event.map((eventItem: any, index: number) => (
              <div key={index}>
                <CardEventMyList
                  id={eventItem.event.id}
                  judul={eventItem.event.name}
                  lokasi={eventItem.event.location.name}
                  waktu={eventItem.event.endDate}
                  harga={eventItem.event.price}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + eventItem.event.imageURL}
                />
              </div>
            ))
          : eventFinish?.map((eventFinishItem: any, index: number) => (
              <div key={index}>
                <CardBeforeReview
                  id={eventFinishItem.event.id}
                  judul={eventFinishItem.event.name}
                  lokasi={eventFinishItem.event.location.name}
                  waktu={eventFinishItem.event.endDate}
                  harga={eventFinishItem.event.price}
                  urlImage={
                    NEXT_PUBLIC_BASE_API_URL + eventFinishItem.event.imageURL
                  }
                />
              </div>
            ))}
      </div>
    </section>
  );
};

export default MyEventList;
