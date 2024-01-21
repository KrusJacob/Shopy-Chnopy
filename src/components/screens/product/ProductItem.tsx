import Button from "@/components/UI/button/Button";
import { IProduct, IProductStatus } from "@/types/product.type";
import Image from "next/image";
import { ShoppingBasket, ShoppingBag, CheckCircle, Trash2, Settings, Star } from "lucide-react";

import React, { useState } from "react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import { useCartStore } from "@/store/cart/StoreCart";
import { motion } from "framer-motion";

import { usePriceWithDiscount } from "@/hooks/usePriceWithDiscount";

import { useSession } from "next-auth/react";
import EditorItem from "./EditorItem";
import { useToast } from "@/hooks/useToast";
import Input from "@/components/UI/input/Input";
import Rating from "./Rating";

type IProductItemProps = {
  product: IProduct;
  status: IProductStatus;
  checked?: boolean;
  quantity?: number;
};

const ProductItem: FC<IProductItemProps> = ({ product, checked, status, quantity }) => {
  const [isEditor, setIsEditor] = useState(false);
  const router = useRouter();
  const session = useSession();
  const productsId = useCartStore((state) => state.productsId);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const excludeProductCart = useCartStore((state) => state.excludeProductCart);
  const removeProductFromCart = useCartStore((state) => state.removeProductToCart);
  const changeQuantityProduct = useCartStore((state) => state.changeQuantityProduct);

  const goToPageProduct = () => {
    router.push(`${navPaths.CATALOG}/${product.id}`);
  };

  const onAddProductToCart = () => {
    if (session.data) {
      console.log("add", `${product.id}`);
      addProductToCart(product.id, session.data!.user.id);
      useToast.addProductToCart(product.title);
    } else router.push(navPaths.SIGNIN);
  };

  const onRemoveProductFromCart = () => {
    if (session.data) {
      removeProductFromCart(product.id, session.data?.user.id);
      useToast.removeProductFromCart(product.title);
    }
  };

  const isProductInCart = !!productsId.find((item) => item.id === product.id);

  const priceWithDiscount = usePriceWithDiscount(product.price, product.discount?.value);
  const isDiscount = priceWithDiscount !== +product!.price;

  //

  //

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="w-full py-2 flex md:flex-row flex-col gap-4 items-center justify-between border-b border-b-grayDark"
    >
      <div className="flex gap-4">
        {/* <Image alt={product.title} src={product.images[0]} width={220} height={220} /> */}
        <img
          onClick={goToPageProduct}
          src={product.images[0]}
          className="lg:w-[220px] lg:h-[220px] w-[190px] h-[190px] cursor-pointer"
          alt={product.title}
        />
        {isEditor ? (
          <EditorItem product={product} setIsEditor={setIsEditor} />
        ) : (
          <div className="flex flex-col gap-2 max-w-[680px]">
            <p onClick={goToPageProduct} className="text-2xl font-semibold cursor-pointer">
              {product.title}
            </p>
            <div className=" text-lg">{product.description}</div>

            <Rating onClick={goToPageProduct} rating={product.rating} />
            <div className="flex gap-2 mt-4 text-2xl items-center font-medium">
              <p className={`${isDiscount ? "line-through" : ""}`}>{product.price}$</p>
              {isDiscount && <p className="text-redDark text-3xl">{priceWithDiscount}$</p>}
              {isDiscount && (
                <div className="text-white py-0.5 px-2 rounded bg-redDark">-{product.discount?.value}%</div>
              )}
            </div>
          </div>
        )}
      </div>

      {status === "InCart" && (
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
      )}
      {status === "InAdmin" && (
        <Button onClick={() => setIsEditor(!isEditor)} Icon={Settings}>
          {isEditor ? "Back" : "Change"}
        </Button>
      )}
      {status === "Default" && (
        <div className="flex flex-col gap-4">
          <Button
            disabled={isProductInCart}
            onClick={() => onAddProductToCart()}
            Icon={isProductInCart ? CheckCircle : ShoppingBasket}
          >
            In cart
          </Button>

          <Button Icon={ShoppingBag}>Buy</Button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductItem;
