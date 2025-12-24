"use client";
import { IProduct } from "@/types/product.type";
import React from "react";
import ProductItem from "../productItem/ProductItem";
import { useFilter } from "@/hooks/useFilter";
import { useCartStore } from "@/store/cart/StoreCart";

const ProductList = ({ products }: { products: IProduct[] }) => {
  const productsInCart = useCartStore((state) => state.productsCart);
  const filteredProducts = useFilter(products);

  return (
    <div className="flex flex-wrap border-l border-r border-grayDark mt-2 px-2">
      {filteredProducts.map((product: IProduct) => {
        const isProductInCart = !!productsInCart.find(
          (item) => item.id === product.id
        );
        return (
          <ProductItem
            isProductInCart={isProductInCart}
            key={product.id}
            product={product}
            type="Default"
          />
        );
      })}
    </div>
  );
};

export default ProductList;
