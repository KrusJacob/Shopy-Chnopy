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
    <div
      onClick={onClick}
      className="group flex gap-1 items-center text-lg text-grayDark cursor-pointer"
    >
      {rating.voted > 0 ? (
        <>
          {Array.from([1, 2, 3, 4, 5]).map((_, i) => (
            <Star
              key={i}
              fill={`${rating.value >= i + 1 ? "gold" : "transparent"}`}
              strokeWidth={1}
            />
          ))}
          <div className="ml-1">
            <span>{rating.value}</span>
            <span className="ml-2 group-hover:text-blue-600">
              ({rating.voted}) vote
            </span>
          </div>
        </>
      ) : (
        <span className=" group-hover:text-blue-600">
          Leave your first review!
        </span>
      )}
    </div>
  );
};

export default Rating;
