"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface IAllEventSectionProps {}

const AllEventSection: React.FunctionComponent<IAllEventSectionProps> = (
  props,
) => {
  //fitur pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  //fitur lain
  const [activeButton, setActiveButton] = React.useState("All");
  const [event, setEvent] = React.useState([]);
  const [getData, setGetData] = React.useState<any>({
    category: "",
  });
  React.useEffect(() => {
    onHandleGet();
  }, [getData, currentPage]);
  const onHandleGet = async () => {
    try {
      let url = "http://localhost:2000/event?";
      if (getData.category) {
        url += `category=${getData.category}`;
      }
      if (getData.page) {
        url += `${url ? "&" : ""}page=${currentPage}`;
      }

      const response = await axios.get(url);
      setEvent(response.data.data);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
      console.log(Math.ceil(response.data.total / response.data.limit));

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    setGetData({ ...getData, page });
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`h-[30px] w-auto border bg-white px-4 ${
          currentPage === i ? "border-blue-500" : "border-gray-400"
        } rounded-md text-black`}
      >
        {i}
      </Button>,
    );
  }

  return (
    <section>
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex  justify-between">
          <div>
            <h1 className=" text-[14px] font-semibold md:text-[24px]">
              All Event
            </h1>
            {/* <h1 className=" mt-[4px] md:mt-[14px] text-[12px] md:text-[14px] font-semibold">
          Menampilkan 62 hasil
          </h1> */}
            <div className="mt-[10px] space-x-4">
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    category: "",
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("All");
                }}
              >
                All
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Musik" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    category: "Musik",
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Musik");
                }}
              >
                Musik
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Webinar" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    category: "Webinar",
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Webinar");
                }}
              >
                Webinar
              </Button>
            </div>
          </div>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {event.map((event: any, index: number) => (
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
        <div className=" hidden space-x-4 md:block">{paginationButtons}</div>
      </div>
    </section>
  );
};

export default AllEventSection;
