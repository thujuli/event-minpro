import * as React from "react";
import CardEvent from "@/app/(user)/_components/cardEvent";
import axios from "axios";

interface IRekomendasiProps {}

const Rekomendasi: React.FunctionComponent<IRekomendasiProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
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
      <div>
        <h1 className=" text-[18px] md:text-[24px] font-semibold">
          Mungkin kamu suka
        </h1>
      </div>
      <div className="flex md:grid md:grid-cols-5 gap-4 my-[18px] overflow-hidden overflow-x-auto">
        {event.slice(0, 5).map((event: any, index) => (
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
    </section>
  );
};

export default Rekomendasi;