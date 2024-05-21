import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import GAMBAR from "@/public/images/not-found.png";

const NotFound: React.FC = () => {
  return (
    <div className="mt-32 w-full space-y-5">
      <Image
        className="mx-auto w-[200px] rounded-md object-contain md:w-[384px] "
        src={GAMBAR}
        width={768}
        height={864}
        alt=""
      />
      <h1 className=" text-center text-2xl font-semibold">404</h1>
      <p className=" px-6  text-center italic md:mx-96">
        Sorry, the page you are trying to access was not found on our server.
        Please return to the main page or use the search feature to find the
        information you need.
      </p>
      <div className=" text-center">
        <Link href="/">
          <Button className=" w-fit hover:bg-[#53b253] md:px-8">
            Back to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
