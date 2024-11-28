"use client";
import PaymentModal from "@/components/entities/paymentModal/PaymentModal";
import { getTotalAmount } from "@/helpers/getTotalAmount";
import React, { useState } from "react";
import CartTotalPrice from "../entities/cart/CartTotalPrice";
import CartProductList from "../entities/cart/CartProductList";
import useProductCart from "../entities/cart/useProductCart";

const CartPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { productsCart, isLoading } = useProductCart();

  const totalPrice = getTotalAmount(productsCart);

  return (
    <div className="max-w-[1200px] m-auto">
      <CartTotalPrice totalPrice={totalPrice} setShowModal={setShowModal} />
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
