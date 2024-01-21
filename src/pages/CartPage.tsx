"use client";
import ProductItem from "@/components/screens/product/ProductItem";

import Button from "@/components/UI/button/Button";
import { usePriceWithDiscount } from "@/hooks/usePriceWithDiscount";
import { productApi } from "@/services/product/productApi";
import { useCartStore } from "@/store/cart/StoreCart";
import { InCart, IProduct } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import { Wallet2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const productsId = useCartStore((state) => state.productsId);

  const idArr = productsId.map((item) => item.id);

  const { data: productCart = [], isLoading } = useQuery({
    queryKey: ["productsCart", ...idArr],
    queryFn: () => productApi.getProductsById(idArr),
    enabled: !!idArr.length,
  });

  const totalPrice = productCart.reduce((sum, item) => {
    const cartItem = productsId.find((i) => i.id === item.id);

    let price = item.price;
    if (item.discount) {
      price = usePriceWithDiscount(item.price, item.discount.value);
    }
    if (!cartItem?.selected) {
      price = 0;
    }
    return sum + price * (cartItem?.quantity || 1);
  }, 0);

  return (
    <div>
      <div className="text-center flex justify-center gap-8 items-center p-2 border-b-2 border-b-black">
        <p className="text-4xl ">
          Total price: <span className="font-medium  mr-2 text-greenDark ">{totalPrice}</span>$
        </p>
        <Button Icon={Wallet2} className="text-xl disabled:opacity-50" disabled={!totalPrice}>
          Buy
        </Button>
      </div>
      <div className="mt-5">
        {!productCart?.length && <p className="text-2xl  text-center">The cart is empty</p>}
        {productCart?.map((product) => {
          const cartItem = productsId.find((i) => i.id === product.id);
          return (
            <ProductItem
              key={product.id}
              product={product}
              status="InCart"
              quantity={cartItem?.quantity || 1}
              checked={cartItem?.selected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
