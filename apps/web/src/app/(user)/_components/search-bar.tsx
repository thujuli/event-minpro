"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import SearchBar from "../_components/handleSeachBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDebounce } from "use-debounce";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardSearch from "./cardSearch";

interface IInputSearchProps {}

const InputSearch: React.FunctionComponent<IInputSearchProps> = (props) => {
  const [getData, setGetData] = React.useState<any>({
    category: "",
  });
  const [search, setSearch] = React.useState("");
  const [event, setEvent] = React.useState<any>([]);
  const [searchDebouce] = useDebounce(search, 1000);
  React.useEffect(() => {
    onHandleGet();
  }, [searchDebouce, getData]);
  const onHandleGet = async () => {
    try {
      let url = `http://localhost:8000/event/search?`;
      if (searchDebouce) {
        url += `name=${searchDebouce}`;
      }
      if(getData.category){
        url += `${searchDebouce ? '&' : ''}category=${getData.category}`;
      }
      let response = await axios.get(url);
      setEvent(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("onChange", searchDebouce);
  console.log("onChange", getData.category);
  return (
    <section className=" mx-auto flex">
      <Sheet>
        <SheetTrigger>
          <Input
            className="mx-auto mt-[10px] h-[36px] w-[300px]"
            type="text"
            placeholder="Cari eventMu"
          />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="mx-auto h-[450px] w-full rounded-lg bg-white md:h-[534px] md:w-[450px]"
        >
          <SheetHeader>
            {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
            <SheetDescription className="  mx-auto">
              <Input
                className="h-[36px] w-[300px]  bg-[#f4f7fe]"
                type="text"
                placeholder="Cari eventMu"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className=" mt-[10px] flex justify-between">
                <Select onValueChange={(element: any) => {
                    const newData = {
                      ...getData,
                      category: element
                    }
                    setGetData(newData);
                  }}>
                  <SelectTrigger className="w-[158px] ">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Musik">Musik</SelectItem>
                    {/* <SelectItem value="system">System</SelectItem> */}
                  </SelectContent>
                </Select>
                {/* <Select>
                  <SelectTrigger className="w-[158px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
              <div className=" flex  overflow-y-scroll rounded-b-lg p-4">
                <div className="mt-[12px] space-y-1">
                  {event.map((event: any, index: number) => (
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default InputSearch;
