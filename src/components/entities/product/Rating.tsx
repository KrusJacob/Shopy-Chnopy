import { Star } from "lucide-react";
import React, { FC } from "react";

type IRatingProps = {
  rating: {
    voted: number;
    value: number;
  };
  onClick?: () => void;
};

const Rating: FC<IRatingProps> = ({ rating, onClick }) => {
  return (
    <div onClick={onClick} className="group flex gap-1 items-center text-lg text-grayDark cursor-pointer">
      <Star fill={`${rating.value >= 1 ? "gold" : "transparent"}`} strokeWidth={1} />
      <Star fill={`${rating.value >= 2 ? "gold" : "transparent"}`} strokeWidth={1} />
      <Star fill={`${rating.value >= 3 ? "gold" : "transparent"}`} strokeWidth={1} />
      <Star fill={`${rating.value >= 4 ? "gold" : "transparent"}`} strokeWidth={1} />
      <Star fill={`${rating.value >= 5 ? "gold" : "transparent"}`} strokeWidth={1} />
      <span className="ml-2 group-hover:underline">{rating.voted} voted</span>
    </div>
  );
};

export default Rating;
