"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import SearchBar from "./handle-seachbar";
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
import CardSearch from "./card-search";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";

interface IInputSearchProps {}

const InputSearch: React.FunctionComponent<IInputSearchProps> = (props) => {
  //buat kategori
  const [categories, setCategories] = React.useState<any[]>([]);

  const [getData, setGetData] = React.useState<any>({
    category: "",
    location: "",
  });
  const [search, setSearch] = React.useState("");
  const [event, setEvent] = React.useState<any>([]);
  const [searchDebouce] = useDebounce(search, 1000);
  React.useEffect(() => {
    onHandleGet();
    getCategories();
  }, [searchDebouce, getData]);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events/search?";
      if (searchDebouce) {
        url += `name=${searchDebouce}`;
      }
      if (getData.category) {
        url += `${searchDebouce ? "&" : ""}category=${getData.category}`;
      }
      let response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const url = NEXT_PUBLIC_BASE_API_URL + "/categories";
      const response = await axios.get(url);
      setCategories(response.data.result);
    } catch (error) {
      console.log("Error fetching categories:", error);
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
            <SheetDescription className="  mx-auto">
              <Input
                className="h-[36px] w-[300px]  bg-[#f4f7fe]"
                type="text"
                placeholder="Cari eventMu"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className=" mt-[10px] flex justify-between">
                <Select
                  onValueChange={(element: string) => {
                    const newData = {
                      ...getData,
                      category: element,
                    };
                    setGetData(newData);
                  }}
                >
                  <SelectTrigger className="w-[158px] ">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  {/* <SelectContent>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Musik">Musik</SelectItem>
                  </SelectContent> */}
                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className=" flex  overflow-y-scroll rounded-b-lg p-4">
                <div className="mt-[12px] space-y-1">
                  {event.map((event: any, index: number) => (
                    <div key={index}>
                      <CardSearch
                        id={event.id}
                        judul={event.name}
                        lokasi={event.location?.name}
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
