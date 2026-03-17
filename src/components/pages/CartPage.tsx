"use client";
import PaymentModal from "@/components/entities/paymentModal/PaymentModal";
import { getTotalAmount } from "@/helpers/getTotalAmount";
import React, { useEffect, useState } from "react";
import CartHeader from "../entities/cart/CartHeader";
import CartProductList from "../entities/cart/CartProductList";
import useProductCart from "../entities/cart/useProductCart";
import { redirect } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import { useUser } from "@/hooks/useUser";

const CartPage = () => {
  const { isAuth } = useUser();

  useEffect(() => {
    if (!isAuth) {
      redirect(navPaths.SIGNIN);
    }
  }, [isAuth]);
  const [isShowModal, setShowModal] = useState(false);
  const { productsCart, isLoading } = useProductCart();

  const totalPrice = getTotalAmount(productsCart);
  const productsSelected = productsCart.filter((item) => item.selected).length;
  const productsLength = productsCart.length;

  return (
    <div className="max-w-[1200px] m-auto">
      <CartHeader
        productsSelected={productsSelected}
        productsLength={productsLength}
        totalPrice={totalPrice}
        setShowModal={setShowModal}
      />
      <CartProductList products={productsCart} isLoading={isLoading} />
      {isShowModal && (
        <PaymentModal
          products={productsCart}
          setIsShowModal={setShowModal}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default CartPage;
