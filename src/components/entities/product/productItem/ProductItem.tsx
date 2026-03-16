import { IProduct, IProductType } from "@/types/product.type";
import React, { ReactNode } from "react";
import { FC } from "react";
import AdminItem from "./adminProduct/AdminItem";
import CartItem from "./cartProduct/CartItem";
import { motion } from "framer-motion";
import CatalogItem from "./catalogProduct/CatalogItem";

type IProductItemProps = {
  product: IProduct;
  type: IProductType;
  checked?: boolean;
  quantity?: number;
  isProductInCart?: boolean;
};

const ProductItem: FC<IProductItemProps> = ({
  product,
  checked,
  type,
  quantity,
  isProductInCart,
}) => {
  switch (type) {
    case "Default":
      return (
        <WrapperItem>
          <CatalogItem
            product={product}
            isProductInCart={isProductInCart || false}
          />
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
      className="hover:shadow-lg border rounded-lg overflow-hidden border-black/20  bg-white/50"
    >
      {children}
    </motion.div>
  );
};

export default ProductItem;
