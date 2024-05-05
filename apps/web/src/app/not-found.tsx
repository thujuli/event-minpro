import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default NotFound;