"use client";
import PaymentModal from "@/components/screens/paymentModal/PaymentModal";
import ProductItem from "@/components/screens/product/ProductItem";
import Button from "@/components/UI/button/Button";
import { getDifferencePrice, usePriceWithDiscount } from "@/hooks/usePriceWithDiscount";
import { productApi } from "@/services/product/productApi";
import { useCartStore } from "@/store/cart/StoreCart";
import { IProduct } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import { Wallet2, XSquare } from "lucide-react";
import React, { useState } from "react";

const CartPage = () => {
  const productsId = useCartStore((state) => state.productsId);
  const [isShowModal, setIsShowModal] = useState(false);

  const idArr = productsId.map((item) => item.id);

  const { data: productCart = [], isLoading } = useQuery({
    queryKey: ["productsCart", ...idArr],
    queryFn: () => productApi.getProductsById(idArr),
    enabled: !!idArr.length,
  });

  const mergeProductCarts = productCart.map((product) => {
    return { ...product, ...productsId.find((item) => item.id === product.id) };
  });

  const productWithDiscountPrice = mergeProductCarts.map((item) => {
    return { ...item, price: item.discount ? usePriceWithDiscount(item.price, item.discount.value) : item.price };
  });

  const totalPrice = mergeProductCarts.reduce((sum, item) => {
    let price = item.price;
    if (item.discount) {
      price = usePriceWithDiscount(item.price, item.discount.value);
    }
    if (!item?.selected) {
      price = 0;
    }
    return sum + price * (item?.quantity || 1);
  }, 0);

  console.log(productCart);

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="text-center  flex justify-center gap-8 items-center p-2 border-b-2 border-b-black">
        <p className="text-4xl ">
          Total price: <span className="font-medium  mr-2 text-greenDark ">{totalPrice}</span>$
        </p>
        <Button
          Icon={Wallet2}
          onClick={() => setIsShowModal(true)}
          className="text-xl disabled:opacity-50"
          disabled={!totalPrice}
        >
          Payment
        </Button>
      </div>
      <div className="mt-5">
        {!productCart?.length && <p className="text-2xl  text-center">The cart is empty</p>}
        {mergeProductCarts?.map((product) => {
          // const cartItem = productsId.find((i) => i.id === product.id);
          return (
            <ProductItem
              key={product.id}
              product={product}
              status="InCart"
              quantity={product?.quantity || 1}
              checked={product?.selected}
            />
          );
        })}
      </div>
      {isShowModal && (
        <PaymentModal
          mergeProductCarts={mergeProductCarts}
          setIsShowModal={setIsShowModal}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default CartPage;
