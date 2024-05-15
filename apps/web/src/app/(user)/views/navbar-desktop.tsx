"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface INavbarDesktopProps {}

const NavbarDesktop: React.FunctionComponent<INavbarDesktopProps> = (props) => {
  return (
    <section className=" hidden h-[80px] w-full border border-b-2   text-black md:block ">
      <div className="mx-[168px] flex items-center justify-between pt-[20px]">
        <Link href={`/`}>
          <h1 className=" text-[20px] font-semibold text-black">NGIVENT</h1>
        </Link>
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
