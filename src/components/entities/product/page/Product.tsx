import Button from "@/components/UI/button/Button";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import { ShoppingBag, CheckCircle, ShoppingBasket } from "lucide-react";
import React, { useState } from "react";
import PaymentModal from "../../paymentModal/PaymentModal";
import { IProduct } from "@/types/product.type";
import ProductImage from "./ProductImage";
import ProductDescr from "./ProductDescr";
import ProductRating from "../rating/ProductRating";
import ProductPrice from "./ProductPrice";
import useProductCart from "./useProductCart";
import { useCartStore } from "@/store/cart/StoreCart";

const Product = ({ product }: { product: IProduct }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const productsInCart = useCartStore((state) => state.productsCart);

  const isProductInCart = !!productsInCart.find(
    (item) => item.id === product.id
  );

  const { handlerAddProduct, IsLoading } = useProductCart();

  return (
    <div className="grid md:grid-cols-2 justify-center   gap-2 m-auto mt-5">
      <ProductImage product={product} />
      <div className="p-6 flex flex-col gap-4 m-auto">
        <ProductDescr product={product} />
        <ProductRating product={product} />
        <ProductPrice product={product} />

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setIsShowModal(true)} Icon={ShoppingBag}>
            Buy
          </Button>
          <Button
            isLoading={IsLoading}
            onClick={() => handlerAddProduct({ id: product.id })}
            disabled={isProductInCart || IsLoading}
            Icon={isProductInCart ? CheckCircle : ShoppingBasket}
          >
            In cart
          </Button>
        </div>
      </div>
      {isShowModal && (
        <PaymentModal
          products={[product]}
          setIsShowModal={setIsShowModal}
          totalPrice={usePriceWithDiscount(
            product.price,
            product.discount?.value
          )}
        />
      )}
    </div>
  );
};

export default Product;
