import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import { IProduct } from "@/types/product.type";
import React from "react";

const ProductPrice = ({ product }: { product: IProduct }) => {
  const priceWithDiscount = usePriceWithDiscount(
    product?.price,
    product?.discount?.value
  );
  const isDiscount = priceWithDiscount !== product.price;

  return (
    <div className=" flex gap-3 lg:text-2xl text-xl items-center font-medium">
      Price:
      <p className={`${isDiscount ? "line-through" : ""}`}>{product.price}$</p>
      {isDiscount && (
        <p className="text-primaryDark text-3xl">{priceWithDiscount}$</p>
      )}
      {isDiscount && (
        <div className="text-white py-0.5 px-2 rounded bg-primaryDark">
          -{product.discount?.value}%
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
