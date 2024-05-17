"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InputSearch from "../_components/search-bar";

interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  return (
    <section className=" hidden h-[80px] w-full border border-b-2   text-black md:block ">
      <div className="mx-[168px] flex items-center justify-between pt-[20px]">
        <div className=" flex items-center space-x-4">
          <Link href={`/`}>
            <Image
              className=" h-fit w-full"
              src="/images/logo.png"
              width={90}
              height={30}
              alt=""
            />
          </Link>
          <InputSearch />
        </div>
        <div className=" flex space-x-2">
          <Link href={`/sign-in`}>
            <Button
              className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
              type="button"
            >
              Sign In
            </Button>
          </Link>
          <Link href={`/sign-up`}>
            <Button
              className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
              type="button"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NavbarDesktop;
