import { IProduct, IProductType } from "@/types/product.type";

import React, { ReactNode } from "react";
import { FC } from "react";
import CatalogItem from "./CatalogItem";
import AdminItem from "./AdminItem";
import CartItem from "./CartItem";
import { motion } from "framer-motion";

type IProductItemProps = {
  product: IProduct;
  type: IProductType;
  checked?: boolean;
  quantity?: number;
};

const ProductItem: FC<IProductItemProps> = ({ product, checked, type, quantity }) => {
  switch (type) {
    case "Default":
      return (
        <WrapperItem>
          <CatalogItem product={product} />
        </WrapperItem>
      );
    case "InAdmin":
      return (
        <WrapperItem>
          <AdminItem product={product} />
        </WrapperItem>
      );
    case "InCart":
      return (
        <WrapperItem>
          <CartItem product={product} checked={checked} quantity={quantity} />
        </WrapperItem>
      );
  }
};

const WrapperItem = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="w-full py-2 md:px-0 px-2 flex md:flex-row flex-col gap-4 md:items-center justify-between border-b border-b-grayDark"
    >
      {children}
    </motion.div>
  );
};

export default ProductItem;
