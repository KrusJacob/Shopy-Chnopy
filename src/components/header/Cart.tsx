"use client";
import { useCartStore } from "@/store/cart/StoreCart";
import React, { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/auth/storeAuth";

const Cart = () => {
  const setProductCart = useCartStore((state) => state.setProductCart);
  const productsCart = useCartStore((state) => state.productsCart);
  const productsIdCart = useAuthStore((state) => state.productsIdCart);
  const router = useRouter();
  const { isAuth } = useUser();

  useEffect(() => {
    if (isAuth) {
      setProductCart(productsIdCart || []);
    }
  }, [isAuth, productsIdCart]);

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
        <span>{(isAuth && productsCart?.length) || 0}</span>
      </div>
    </div>
  );
};

export default Cart;
