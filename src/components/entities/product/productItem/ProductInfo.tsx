import React from "react";
import Rating from "../rating/Rating";
import { IProduct } from "@/types/product.type";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import { navPaths } from "@/services/navPaths";
import { useRouter } from "next/navigation";
import { getCutBack } from "@/helpers/getCutBack";

interface Props {
  product: IProduct;
}

const ProductInfo = ({ product }: Props) => {
  const priceWithDiscount = usePriceWithDiscount(
    product.price,
    product.discount?.value
  );
  const isDiscount = priceWithDiscount !== +product!.price;
  const router = useRouter();

  const goToPageProduct = () => {
    router.push(`${navPaths.CATALOG}/${product.id}`);
  };

  return (
    <div className="flex  flex-col gap-2 p-4">
      <p
        onClick={goToPageProduct}
        className="md:text-xl text-base font-semibold cursor-pointer"
      >
        {product.title}
      </p>
      <div className="md:text-sm text-xs">
        {getCutBack(product.description)}
      </div>
      <div className="flex md:flex-row flex-col md:items-center gap-4">
        <div className="flex gap-2  text-lg items-center font-medium">
          {isDiscount && <p className="text-xl">{priceWithDiscount}$</p>}
          <p className={`${isDiscount ? "line-through opacity-50" : ""}`}>
            {product.price}$
          </p>
        </div>
        <Rating onClick={goToPageProduct} rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductInfo;
