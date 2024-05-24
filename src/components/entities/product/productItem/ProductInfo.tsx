import React from "react";
import Rating from "../Rating";
import { IProduct } from "@/types/product.type";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import { navPaths } from "@/services/navPaths";
import { useRouter } from "next/navigation";

interface Props {
  product: IProduct;
}

const ProductInfo = ({ product }: Props) => {
  const priceWithDiscount = usePriceWithDiscount(product.price, product.discount?.value);
  const isDiscount = priceWithDiscount !== +product!.price;
  const router = useRouter();

  const goToPageProduct = () => {
    router.push(`${navPaths.CATALOG}/${product.id}`);
  };

  return (
    <div className="flex flex-col gap-2 max-w-[680px]">
      <p onClick={goToPageProduct} className="md:text-2xl text-lg font-semibold cursor-pointer">
        {product.title}
      </p>
      <div className="md:text-lg text-md">{product.description}</div>

      <Rating onClick={goToPageProduct} rating={product.rating} />
      <div className="flex gap-2 mt-2 text-2xl items-center font-medium">
        <p className={`${isDiscount ? "line-through" : ""}`}>{product.price}$</p>
        {isDiscount && <p className="text-redDark text-3xl">{priceWithDiscount}$</p>}
        {isDiscount && (
          <div className="text-white py-0.5 px-2 rounded bg-redDark">-{product.discount?.value}%</div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
