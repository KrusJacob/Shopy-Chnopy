import { motion } from "framer-motion";
import React, { useState } from "react";
import EditorItem from "./EditorItem";
import ProductInfo from "./ProductInfo";
import { IProduct } from "@/types/product.type";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";

interface Props {
  product: IProduct;
}

const ProductItemBody = ({ product }: Props) => {
  const router = useRouter();

  const goToPageProduct = () => {
    router.push(`${navPaths.CATALOG}/${product.id}`);
  };

  return (
    <img
      onClick={goToPageProduct}
      src={product.images[0]}
      className="lg:w-[220px] lg:h-[220px] w-[190px] h-[190px] cursor-pointer hover:scale-[1.03] duration-300"
      alt={product.title}
    />
  );
};

export default ProductItemBody;
