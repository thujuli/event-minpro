"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardEventMyList from "../_components/card-event-my-list";
import CardBeforeReview from "../_components/card-after-event";

interface IMyEventListProps {}

const MyEventList: React.FunctionComponent<IMyEventListProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [showOnGoing, setShowOnGoing] =React.useState(true); 
  const [stateStatus, setStateStatus] = React.useState(4);
  React.useEffect(() => {
    onHandleGet();
  }, [stateStatus]);
  const onHandleGet = async () => {
    try {
      // route ini nanti diganti sesuai event? id pengggna, status
      let url = NEXT_PUBLIC_BASE_API_URL + `/events?categoryId=${stateStatus}`;
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowOnGoing = () => {
    setShowOnGoing(true);
    setStateStatus(4); // Update stateStatus to filter onGoing events
  };

  const handleShowCompleted = () => {
    setShowOnGoing(false);
    setStateStatus(2); // Update stateStatus to filter completed events
  };
  return (
    <section>
      <div className="mx-10 flex  justify-evenly ">
        <button onClick={handleShowOnGoing} className=" font-semibold">
          On Going
        </button>
        <button onClick={handleShowCompleted} className=" font-semibold">
          Selesai
        </button>
      </div>
      <div className="mx-10 my-[18px] md:grid md:grid-cols-4 md:gap-4 md:p-6">
        {event.map((event: any, index: number) => (
          <div key={index}>
            {showOnGoing ? (
              <CardEventMyList
                id={event.id}
                judul={event.name}
                lokasi={event.location.name}
                waktu={event.endDate}
                harga={event.price}
                urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
              />
            ) : (
              <CardBeforeReview
                id={event.id}
                judul={event.name}
                lokasi={event.location.name}
                waktu={event.endDate}
                harga={event.price}
                urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyEventList;
