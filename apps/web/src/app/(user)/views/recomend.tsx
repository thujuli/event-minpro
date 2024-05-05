import * as React from "react";
import CardEvent from "@/app/(user)/_components/card-event";
import axios from "axios";

interface IRecomendProps {}

const Recomend: React.FunctionComponent<IRecomendProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
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
    <section className=" mt-[10px] rounded-lg bg-white p-[20px] md:px-[28px] md:py-[28px]">
      <div id="stroke" className=" mb-[40px] hidden border md:block"></div>
      <div className=" mt-[10px]">
        <h1 className=" text-[18px] font-semibold md:text-[18px] ">
          Mungkin kamu suka
        </h1>
      </div>
      <div className="my-[18px] flex gap-4 overflow-hidden md:grid md:grid-cols-5 ">
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
      <div id="stroke" className=" mt-[40px] hidden border md:block"></div>
    </section>
  );
};

export default Recomend;
