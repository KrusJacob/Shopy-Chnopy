"use client";
import { useCartStore } from "@/store/cart/StoreCart";
import React, { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import { useSession } from "next-auth/react";
import { userApi } from "@/services/user/userApi";
import { useQuery } from "@tanstack/react-query";

const Cart = () => {
  const session = useSession();

  const userId = session.data?.user?.id;

  const productsId = useCartStore((state) => state.productsId);
  const setProductCart = useCartStore((state) => state.setProductCart);

  const router = useRouter();

  const { data: currentUser, isSuccess } = useQuery({
    queryKey: ["productsId", userId],
    queryFn: () => userApi.getUsersById(session.data?.user?.id!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && currentUser) {
      setProductCart(currentUser.productsInCart);
    }
  }, [isSuccess]);

  return (
    <div onClick={() => router.push(navPaths.CART)} className="relative lg:mr-8">
      <ShoppingBasket size={50} className="cursor-pointer hover:scale-125 duration-200" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-grayDark text-white flex justify-center items-center rounded-full cursor-default animate-zoomIn">
        <span>{productsId.length || 0}</span>
      </div>
    </div>
  );
};

export default Cart;
