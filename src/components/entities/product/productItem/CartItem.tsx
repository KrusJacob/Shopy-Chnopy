import { useCartStore } from "@/store/cart/StoreCart";
import { useSession } from "next-auth/react";

import React, { useState } from "react";

import ProductInfo from "./ProductInfo";
import { IProduct } from "@/types/product.type";
import Input from "@/components/UI/input/Input";
import Button from "@/components/UI/button/Button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ProductItemBody from "./ProductItemBody";

interface Props {
  product: IProduct;
  checked?: boolean;
  quantity?: number;
}

const CartItem = ({ product, checked, quantity }: Props) => {
  const session = useSession();

  const excludeProductCart = useCartStore((state) => state.excludeProductCart);
  const removeProductFromCart = useCartStore((state) => state.removeProductToCart);
  const changeQuantityProduct = useCartStore((state) => state.changeQuantityProduct);

  const onRemoveProductFromCart = () => {
    if (session.data) {
      removeProductFromCart(product.id, session.data?.user.id);
      useToast.removeProductFromCart(product.title);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <ProductItemBody product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="p-2 flex flex-col gap-6 ">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => excludeProductCart(product.id)}
          className="w-7 h-7 mt-8 self-center"
        />
        <div className="flex items-center">
          <p className="text-xl font-medium">quantity:</p>
          <Input
            type="number"
            min={1}
            onChange={(e) => changeQuantityProduct(product.id, +e.target.value)}
            defaultValue={quantity}
            className="w-20 ml-2 text-xl text-center"
          />
        </div>
        <Button Icon={Trash2} onClick={() => onRemoveProductFromCart()}>
          Remove
        </Button>
      </div>
    </>
  );
};

export default CartItem;
