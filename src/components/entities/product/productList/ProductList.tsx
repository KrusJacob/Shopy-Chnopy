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
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-2 ">
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
      {!filteredProducts.length && (
        <div className="text-2xl  text-center mt-8">No products found</div>
      )}
    </>
  );
};

export default ProductList;
