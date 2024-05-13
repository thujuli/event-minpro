"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "next/navigation";

interface IReviewProps {}

const Review: React.FunctionComponent<IReviewProps> = (props) => {
  const [clickedStars, setClickedStars] = React.useState(0);

  const handleClick = (starIndex: number) => {
    setClickedStars(starIndex);
  };
  const [textReview, settextReview] = React.useState<string>("");
  const [dataProfile, setDataProfile] = React.useState<any[]>([]);
  const params = useParams();
  const [event, setEvent] = React.useState<any>([]);
  React.useEffect(() => {
    getApiDetailEvent();
  }, [clickedStars, textReview]);

  const getApiDetailEvent = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${params.eventId}`;
      const response = await axios.get(url);
      setEvent(response.data.result[0]);
      // setDataProfile(UserProfile.result);
      console.log("INI DATA :", response.data.result[0]);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  console.log("CEK LOG :", clickedStars);
  console.log("CEK LOG :", textReview);

  const postReview = async () => {
    try {
      // const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      // setDataProfile(UserProfile.result);

      // Handle  Token
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };

      let url = NEXT_PUBLIC_BASE_API_URL + `/reviews`;
      const response = await axios.post(
        url,
        {
          rating: clickedStars,
          message: textReview,
          eventId: Number(params.eventId),
        },
        config,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className=" w-full rounded-lg bg-white p-10">
      <div className=" flex- flex-col space-y-4">
        <Image
          className="h-[400px] w-full rounded-md bg-cover bg-center"
          src={ event.imageURL}
          width={1000}
          height={1000}
          alt=""
        />
        <h1>{event.name}</h1>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              className={`h-6 w-6 cursor-pointer ${
                index <= clickedStars ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <Textarea onChange={(e) => settextReview(e.target.value)} />
        <Button
          className="block h-[36px] w-[300px] rounded-md  bg-[#53B253]  text-white md:block"
          type="button"
          onClick={postReview}
        >
          Submit Review
        </Button>
      </div>
    </section>
  );
};

export default Review;
