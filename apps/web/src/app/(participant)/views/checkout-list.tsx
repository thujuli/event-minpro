"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardCheckout from "../_components/card-checkout";
import Cookies from "js-cookie";

interface IMyChecoutListProps {}

const MyChecoutList: React.FunctionComponent<IMyChecoutListProps> = (props) => {
  const [event, setEvent] = React.useState([]);

  React.useEffect(() => {
    onHandleGet();
  }, []);
  const onHandleGet = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };
      // route ini nanti diganti sesuai event? id pengggna, status
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/waiting`;
      const response = await axios.get(url, config);
      setEvent(response.data.result);
      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="my-[18px] grid grid-cols-2 gap-4 md:mx-10 md:grid-cols-4 md:p-6">
        {event?.map((event: any, index: number) => (
          <div key={index}>
            <CardCheckout
              id={event.transactionId}
              judul={event.name}
              lokasi={event.location.name}
              waktu={event.createdAt}
              harga={event.discountedAmount ?? event.originalAmount}
              urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyChecoutList;
