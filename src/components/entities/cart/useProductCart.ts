import { ProductApi } from "@/shared/api/product";
import { useCartStore } from "@/store/cart/StoreCart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

const useProductCart = () => {
  const productsIdInCart = useCartStore((state) => state.productsId);
  const productsId = productsIdInCart.map((item) => item.id);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", `${productsId}`],
    queryFn: () => ProductApi.getProductListById(productsId),
    placeholderData: keepPreviousData,
  });

  const productsCart = products.map((product) => {
    return {
      ...product,
      ...productsIdInCart.find((item) => item.id === product.id),
    };
  });

  return { productsCart, isLoading };
};

export default useProductCart;
