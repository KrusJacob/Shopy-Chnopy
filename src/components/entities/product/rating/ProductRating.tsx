import { navPaths } from "@/services/navPaths";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Rating from "./Rating";
import { AnimatePresence } from "framer-motion";
import FeedBackProductForm from "./FeedBackProductForm";
import { IProduct } from "@/types/product.type";

const ProductRating = ({ product }: { product: IProduct }) => {
  const session = useSession();
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const router = useRouter();

  const onVoteToProduct = () => {
    if (session.data) {
      setIsFeedback(!isFeedback);
    } else router.push(navPaths.SIGNIN);
  };

  return (
    <>
      <Rating onClick={onVoteToProduct} rating={product.rating} />
      <AnimatePresence>
        {isFeedback && (
          <FeedBackProductForm
            setIsFeedback={setIsFeedback}
            product={product}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductRating;
