import { IProductsInCart } from "@/types/product.type";
import React from "react";
import ProductItem from "../product/productItem/ProductItem";
import Loader from "@/components/UI/loader/Loader";

interface Props {
  products: IProductsInCart[];
  isLoading: boolean;
}
const CartProductList = ({ products, isLoading }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-5">
      {!products?.length && !isLoading && (
        <p className="text-2xl  text-center">The cart is empty</p>
      )}
      {isLoading && <Loader />}
      {products?.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            type="InCart"
            quantity={product?.quantity || 1}
            checked={product?.selected}
          />
        );
      })}
    </div>
  );
};

export default CartProductList;
