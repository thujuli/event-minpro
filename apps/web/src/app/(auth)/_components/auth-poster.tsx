import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  name: string;
};

const AuthPoster: React.FC<Props> = (props) => {
  const { image, name } = props;

  return (
    <div className="relative hidden min-h-screen w-full lg:block">
      <Image
        src={image}
        alt={name}
        quality={100}
        fill
        placeholder="blur"
        sizes="100vw"
        className="bg-cover"
      />
    </div>
  );
};

export default AuthPoster;
