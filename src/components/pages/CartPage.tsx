"use client";
import PaymentModal from "@/components/entities/paymentModal/PaymentModal";
import ProductItem from "@/components/entities/product/productItem/ProductItem";
import Button from "@/components/UI/button/Button";
import { getTotalAmount } from "@/helpers/getTotalAmount";
import { productApi } from "@/services/product/productApi";
import { useCartStore } from "@/store/cart/StoreCart";
import { useQuery } from "@tanstack/react-query";
import { Wallet2 } from "lucide-react";
import React, { useState } from "react";

const CartPage = () => {
  const productsId = useCartStore((state) => state.productsId);
  const [isShowModal, setIsShowModal] = useState(false);

  const idArr = productsId.map((item) => item.id);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["productsCart", ...idArr],
    queryFn: () => productApi.getProductsById(idArr),
    enabled: !!idArr.length,
  });

  const productsInCart = products.map((product) => {
    return { ...product, ...productsId.find((item) => item.id === product.id) };
  });

  const totalPrice = getTotalAmount(productsInCart);

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="text-center  flex justify-center md:gap-8 gap-4 items-center p-2 border-b-2 border-b-black">
        <p className="md:text-3xl text-2xl ">
          Total price:{" "}
          <span className="font-medium  mr-2 text-greenDark ">
            {totalPrice}
          </span>
          $
        </p>
        <Button
          Icon={Wallet2}
          onClick={() => setIsShowModal(true)}
          className="md:text-xl text-base disabled:opacity-50"
          disabled={!totalPrice}
        >
          Payment
        </Button>
      </div>
      <div className="mt-5">
        {!products?.length && (
          <p className="text-2xl  text-center">The cart is empty</p>
        )}
        {productsInCart?.map((product) => {
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
      {isShowModal && (
        <PaymentModal
          products={productsInCart}
          setIsShowModal={setIsShowModal}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default CartPage;
