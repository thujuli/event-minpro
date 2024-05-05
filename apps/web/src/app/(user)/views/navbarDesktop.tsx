"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "../_components/handleSeachBar";
import InputSearch from "../_components/search-bar";

interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <section className=" hidden h-[152px] w-full border-b-2 bg-white  text-black md:block ">
      <div className="mx-[168px] flex justify-between pt-[20px]">
        <h1>Logo</h1>
        <div className=" flex space-x-2">
          <Button
            className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
            type="button"
          >
            Sign In
          </Button>
          <Button
            className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
            type="button"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div id="stroke" className=" mt-[30px] border "></div>
      <div className="mx-[168px] ">
        {/* <SearchBar/> */}
        <InputSearch />
      </div>
    </section>
  );
};

export default NavbarDesktop;
