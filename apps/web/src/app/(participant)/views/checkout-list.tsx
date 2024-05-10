"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardEventMyList from "../_components/card-event-my-list";
import CardCheckout from "../_components/card-checkout";


interface IMyChecoutListProps {}

const MyChecoutList: React.FunctionComponent<IMyChecoutListProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [showOnGoing, setShowOnGoing] = React.useState(true);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const onHandleGet = async () => {
    try {
      // route ini nanti diganti sesuai event? id pengggna, status
      let url = NEXT_PUBLIC_BASE_API_URL + `/events?categoryId=${4}`;
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
        <div className="mx-10 my-[18px] md:grid md:grid-cols-4 md:gap-4 md:p-6">
        {event
            .map((event: any, index: number) => (
              <div key={index}>
                <CardCheckout
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
    </section>
  );
};

export default MyChecoutList;
