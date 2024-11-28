import { useToast } from "@/hooks/useToast";
import { ProductApi } from "@/shared/api/product";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const stars = ["bad", "not very", "acceptable", "good", "excellent"];

const useRating = (setIsFeedback: (is: boolean) => void) => {
  const [feedBackTitle, setFeedBackTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ProductApi.updateProduct,
    onSuccess: (product) => {
      queryClient.invalidateQueries({
        queryKey: [ProductApi.baseKey, `${product.id}`],
      });
      useToast.voteRateProduct(product.title);
    },
    onSettled: () => {
      setIsFeedback(false);
    },
    onError: () => {
      useToast.error();
    },
  });

  const submitVote = (product: IProduct) => {
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
  };

  return {
    submitVote,
    feedBackTitle,
    setFeedBackTitle,
    isPending: mutation.isPending,
  };
};

export default useRating;
