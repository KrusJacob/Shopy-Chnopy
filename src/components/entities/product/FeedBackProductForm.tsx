import { useToast } from "@/hooks/useToast";
import { productApi } from "@/services/product/productApi";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Button from "@/components/UI/button/Button";
import { type } from "os";

const starStyles = {
  strokeWidth: 1,
  size: 36,
};

const stars = ["bad", "not very", "acceptable", "good", "excellent"];

type FeedBackProductFormProps = {
  setIsFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
};

const FeedBackProductForm: FC<FeedBackProductFormProps> = ({ setIsFeedback, product }) => {
  const [feedBackTitle, setFeedBackTitle] = useState("");
  const [isVoted, setIsVoted] = useState(false);

  const onSubmitVote = () => {
    const ratingValue = stars.findIndex((star) => star === feedBackTitle) + 1;
    const ratingTotalValue = product.rating.totalValue + ratingValue;

    const chandedProduct = {
      ...product,
      rating: {
        totalValue: ratingTotalValue,
        value: Math.floor(ratingTotalValue / (product.rating.voted + 1)),
        voted: product.rating.voted + 1,
      },
    };
    mutation.mutate(chandedProduct);
    useToast.voteRateProduct(product.title, ratingValue);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["product", `productId:${product.id}`],
    mutationFn: (product: IProduct) => productApi.changeProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", `productId:${product.id}`] });
      setIsFeedback(false);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="mt-14 border py-2 px-2 w-min rounded bg-slate-50 border-grayDark "
    >
      <div className="flex gap-2 text-lg">
        <h5>You feedback:</h5>
        <p>{feedBackTitle}</p>
      </div>
      <div className="flex gap-1 mt-2 px-8">
        {stars.map((item, i) => (
          <Star
            key={item}
            {...starStyles}
            className="duration-200 cursor-pointer"
            fill={i > stars.findIndex((star) => star === feedBackTitle) ? "beige" : "gold"}
            onMouseEnter={() => setFeedBackTitle(item)}
            onClick={() => setIsVoted(true)}
          />
        ))}
      </div>
      <Button onClick={onSubmitVote} disabled={!isVoted} className="mt-8 mx-auto disabled:opacity-60">
        Submit
      </Button>
    </motion.div>
  );
};

export default FeedBackProductForm;
