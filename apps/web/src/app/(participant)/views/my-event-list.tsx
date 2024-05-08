"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardEventMyList from "../_components/card-event-my-list";

interface IMyEventListProps {}

const MyEventList: React.FunctionComponent<IMyEventListProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const onHandleGet = async () => {
    try {
        // route ini nanti diganti sesuai event? id pengggna, status
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=4";
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className="mx-10 flex  justify-evenly ">
        <h1 className=" font-semibold">On Going</h1>
        <h1 className=" font-semibold">Selesai</h1>
      </div>
      <div className="mx-10 my-[18px] md:grid md:grid-cols-4 md:gap-4 md:p-6">
        {event.map((event: any, index: number) => (
          <div key={index}>
            <CardEventMyList
              id={event.id}
              judul={event.name}
              lokasi={event.location.name}
              waktu={event.endDate}
              harga={event.price}
              urlImage={event.imageURL}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyEventList;
