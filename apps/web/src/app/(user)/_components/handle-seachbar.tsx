"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactModal from "react-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import CardSearch from "./card-search";
import { useDebounce } from "use-debounce";

interface ISearchBarProps {}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  const [search, setSearch] = React.useState("");
  const [event, setEvent] = React.useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [searchDebouce] = useDebounce(search, 1000);
  React.useEffect(() => {
    onHandleGet();
  }, [searchDebouce]);
  const onHandleGet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/event/search?name=${searchDebouce}`,
      );
      setEvent(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("onChange", searchDebouce);

  return (
    <section className="relative ">
      <div className=" relative mx-[168px] mt-6 ">
        <div className="">
          <Input
            className="mt-[10px] h-[36px] w-[300px] "
            type="text"
            placeholder="Cari eventMu"
            onClick={() => setModalIsOpen(true)}
          />
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="absolute h-auto w-[500px] rounded-lg p-10 "
            portalClassName="modal-portal"
          >
            <div className="flex items-center justify-between  ">
              <Input
                className="h-[36px] w-[300px]  bg-[#f4f7fe]"
                type="text"
                placeholder="Cari eventMu"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                className=" h-[40px] w-[78px]  border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="mt-4 flex justify-around bg-white">
              <Select onValueChange={(e: any) => console.log(e)}>
                <SelectTrigger className="w-[158px] ">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[158px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className=" flex overflow-hidden rounded-b-lg bg-white p-4">
              <div className="mt-[12px] space-y-1">
                {event.slice(0, 5).map((event: any, index) => (
                  <div key={index}>
                    <CardSearch
                      id={event.id}
                      judul={event.name}
                      lokasi={event.location}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;