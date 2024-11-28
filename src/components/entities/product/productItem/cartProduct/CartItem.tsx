import { useCartStore } from "@/store/cart/StoreCart";
import React from "react";
import ProductInfo from "../ProductInfo";
import { IProduct } from "@/types/product.type";
import Input from "@/components/UI/input/Input";
import Button from "@/components/UI/button/Button";
import { Trash2 } from "lucide-react";
import ProductItemBody from "../ProductItemBody";
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
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <ProductItemBody product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="p-2 flex flex-col gap-6 ">
        <Input
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
        <Button
          isLoading={isPending}
          Icon={Trash2}
          onClick={() => handlerRemoveProduct(product.id)}
        >
          Remove
        </Button>
      </div>
    </>
  );
};

export default CartItem;
