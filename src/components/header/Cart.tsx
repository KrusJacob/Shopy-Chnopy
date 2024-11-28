"use client";
import { useCartStore } from "@/store/cart/StoreCart";
import React, { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import useUser from "./navigation/useUser";

const Cart = () => {
  const setProductCart = useCartStore((state) => state.setProductCart);
  const router = useRouter();

  const { currentUser, isSuccess } = useUser();

  useEffect(() => {
    if (isSuccess && currentUser) {
      setProductCart(currentUser.productsInCart);
    }
  }, [isSuccess]);

  return (
    <div
      onClick={() => router.push(navPaths.CART)}
      className="relative lg:mr-4"
    >
      <ShoppingBasket
        size={50}
        className="cursor-pointer hover:scale-125 duration-200"
      />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-grayDark text-white flex justify-center items-center rounded-full cursor-default animate-zoomIn">
        <span>{currentUser?.productsInCart.length || 0}</span>
      </div>
    </div>
  );
};

export default Cart;
