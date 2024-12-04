import { IProduct } from "@/types/product.type";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Button from "@/components/UI/button/Button";
import useRating from "./useRating";

const starStyles = {
  strokeWidth: 1,
  size: 34,
};

const stars = ["bad", "not very", "acceptable", "good", "excellent"];

type Props = {
  setIsFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
};

const FeedBackProductForm: FC<Props> = ({ setIsFeedback, product }) => {
  const [isVoted, setIsVoted] = useState(false);

  const { feedBackTitle, setFeedBackTitle, submitVote, isPending } =
    useRating(setIsFeedback);

  return (
    <div
      onClick={() => setIsFeedback(false)}
      className="absolute inset-0 bg-black flex justify-center items-center bg-opacity-40"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="border py-2 px-2 w-min rounded bg-slate-50 border-grayDark absolute  z-50"
      >
        <div className="flex gap-2 text-lg">
          <h5>You feedback:</h5>
          <p>{feedBackTitle}</p>
        </div>
        <div className="flex gap-2 mt-1 px-4">
          {stars.map((item, i) => (
            <Star
              key={item}
              {...starStyles}
              className="duration-200 cursor-pointer"
              fill={
                i > stars.findIndex((star) => star === feedBackTitle)
                  ? "beige"
                  : "gold"
              }
              onMouseEnter={() => setFeedBackTitle(item)}
              onClick={() => setIsVoted(true)}
            />
          ))}
        </div>
        <Button
          onClick={() => submitVote(product)}
          disabled={!isVoted || isPending}
          className="mt-4 mx-auto disabled:opacity-60"
        >
          Submit
        </Button>
      </motion.div>
    </div>
  );
};

export default FeedBackProductForm;
