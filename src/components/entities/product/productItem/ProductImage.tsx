import React from "react";
import { IProduct } from "@/types/product.type";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";

interface Props {
  product: IProduct;
}

const ProductImage = ({ product }: Props) => {
  const router = useRouter();

  const goToPageProduct = () => {
    router.push(`${navPaths.CATALOG}/${product.id}`);
  };

  return (
    <div className="relative aspect-square overflow-hidden">
      <img
        onClick={goToPageProduct}
        src={product.images[0]}
        className="cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
        alt={product.title}
      />
    </div>
  );
};

export default ProductImage;
