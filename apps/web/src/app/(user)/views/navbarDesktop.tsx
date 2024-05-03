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
import SearchBar from "../_components/handleSeachBar";

interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <section className=" hidden md:block w-full h-[152px] bg-white  text-black border-b-2 ">
      <div className="mx-[168px] flex justify-between pt-[20px]">
        <h1>Logo</h1>
        <div className=" flex space-x-2">
          <Button
            className=" w-[78px] h-[40px] mx-auto bg-white border border-gray-400 text-black"
            type="button"
          >
            Sign In
          </Button>
          <Button
            className=" w-[78px] h-[40px] mx-auto bg-white border border-gray-400 text-black"
            type="button"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div id="stroke" className=" border mt-[10px]"></div>
      <SearchBar/>
    </section>
  );
};

export default NavbarDesktop;