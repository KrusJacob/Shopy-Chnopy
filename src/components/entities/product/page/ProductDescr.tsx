import { IProduct } from "@/types/product.type";
import React from "react";

const ProductDescr = ({ product }: { product: IProduct }) => {
  return (
    <>
      <p className="lg:text-3xl text-2xl font-medium text-center">
        {product?.title}
      </p>
      <p className="lg:text-xl text-md">{product?.description}</p>
    </>
  );
};

export default ProductDescr;
