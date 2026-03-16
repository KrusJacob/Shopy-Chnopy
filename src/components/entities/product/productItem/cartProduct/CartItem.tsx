import { useCartStore } from "@/store/cart/StoreCart";
import React from "react";
import ProductInfo from "../ProductInfo";
import { IProduct } from "@/types/product.type";
import Input from "@/components/UI/input/Input";
import Button from "@/components/UI/button/Button";
import { Trash2, Minus, Plus } from "lucide-react";
import ProductImage from "../ProductImage";
import useRemoveProduct from "./useRemoveProduct";

interface Props {
  product: IProduct;
  checked?: boolean;
  quantity?: number;
}

const CartItem = ({ product, checked = false, quantity = 1 }: Props) => {
  const excludeProductCart = useCartStore((state) => state.excludeProductCart);
  const changeQuantityProduct = useCartStore(
    (state) => state.changeQuantityProduct
  );

  const { handlerRemoveProduct, isPending } = useRemoveProduct();

  return (
    <div className="relative">
      <div className="flex flex-col gap-4">
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="p-4 flex flex-col gap-6  ">
        <Input
          type="checkbox"
          checked={checked}
          onChange={() => excludeProductCart(product.id)}
          className="w-10 h-10  absolute top-2 right-2"
        />
        <div className="flex items-center gap-4">
          <p className="text-xl">quantity</p>
          <Minus
            className={`${
              quantity === 1 && "opacity-30"
            } border rounded-full p-1`}
            size={36}
            onClick={() => {
              if (quantity === 1) return;
              changeQuantityProduct(product.id, quantity - 1);
            }}
          />
          <span className="text-xl md:text-2xl font-medium">{quantity}</span>
          <Plus
            className="border rounded-full p-1"
            size={36}
            onClick={() => changeQuantityProduct(product.id, quantity + 1)}
          />
        </div>
        <Button
          isLoading={isPending}
          Icon={Trash2}
          onClick={() => handlerRemoveProduct(product.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
