"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
import GAMBAR from "@/public/images/unauthorized.webp";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  useEffect(() => {
    Cookie.remove("admin-tkn");
    Cookie.remove("user-tkn");
  }, []);

  return (
    <div className="mt-32 w-full space-y-5">
      <Image
        className="mx-auto w-[200px] rounded-md object-contain md:w-[384px] "
        src={GAMBAR}
        width={768}
        height={864}
        alt=""
      />
      <h1 className=" text-center text-2xl font-semibold">401</h1>
      <p className=" px-6  text-center italic md:mx-96">
        To view this page, special permission is required. If you`re sure you
        have the correct permissions, try logging in again or contact our
        support.
      </p>
      <div className=" text-center">
        <Link href="/sign-in">
          <Button className=" w-fit md:px-8 hover:bg-[#53b253]">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
