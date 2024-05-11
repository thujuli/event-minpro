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
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { Slider } from "@/components/ui/slider";

interface IAllEventSectionProps {}

const AllEventSection: React.FunctionComponent<IAllEventSectionProps> = (
  props,
) => {
  //FILTERING
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  //fitur pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  //fitur lain
  const [activeButton, setActiveButton] = React.useState("All");
  const [events, setEvents] = React.useState([]);
  const [getData, setGetData] = React.useState<any>({
    categoryId: 0,
  });
  React.useEffect(() => {
    onHandleGet();
  }, [getData, currentPage]);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?";
      if (getData.categoryId) {
        url += `categoryId=${getData.categoryId}`;
      }
      if (getData.page) {
        url += `${url ? "&" : ""}page=${currentPage}`;
      }

      const response = await axios.get(url);
      setEvents(response.data.result);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
      console.log(Math.ceil(response.data.total / response.data.limit));
      console.log("INI LOG DATA EVENTS", response.data.result[0]);

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
                    categoryId: 0,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("All");
                }}
              >
                All
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Festival" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 1,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Festival");
                }}
              >
                Festival
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Concert" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 2,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Concert");
                }}
              >
                Concert
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Sport" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 3,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Sport");
                }}
              >
                Sport
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Workshop & Seminar" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 4,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Workshop & Seminar");
                }}
              >
                Workshop & Seminar
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Theater & Drama" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 5,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Theater & Drama");
                }}
              >
                Theater & Drama
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Attractions" ? "border-blue-500" : "border-gray-400"} rounded-md text-black`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 6,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Attractions");
                }}
              >
                Attractions
              </Button>
            </div>
            <Button className="  " onClick={handleShowConfirmationModal}>
              Filtering
            </Button>
            {showConfirmationModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="rounded-lg bg-white p-8">
                  <p>Apakah Anda yakin sudah melakukan pembayaran?</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    {/* TINGGAL BUTTON YA NYA KASIH FUNCTION BUAT NGIRIM AXIOS */}
                    {/* <Button>Ya</Button> */}
                    {/* BUAT ON CHANGE FILTERING  BY PRICE */}
                    <Slider defaultValue={[33]} max={100} step={1} />
                    <div>
                      <Button onClick={handleCloseConfirmationModal}>
                        Batal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {events.map((event: any, index: number) => (
            <div key={index}>
              <CardEvent
                id={event.id}
                urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                judul={event.name}
                lokasi={event.location.name}
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
