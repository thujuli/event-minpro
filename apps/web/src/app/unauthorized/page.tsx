"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Cookie from "js-cookie";

const NotFound: React.FC = () => {
  useEffect(() => {
    Cookie.remove("admin-tkn");
    Cookie.remove("user-tkn");
  }, []);

  return (
    <div>
      <h1>401</h1>
      <p>Unauthorized</p>
      <Link href="/">Signin</Link>
    </div>
  );
};

export default NotFound;
