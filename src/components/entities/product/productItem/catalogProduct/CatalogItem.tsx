import React, { useState } from "react";
import ProductInfo from "../ProductInfo";
import { IProduct } from "@/types/product.type";
import Button from "@/components/UI/button/Button";
import { CheckCircle, ShoppingBag, ShoppingBasket } from "lucide-react";
import ProductItemBody from "../ProductItemBody";
import PaymentModal from "../../../paymentModal/PaymentModal";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import useProductCart from "../../page/useProductCart";

interface Props {
  product: IProduct;
  isProductInCart: boolean;
}

const CatalogItem = ({ product, isProductInCart }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const { handlerAddProduct, IsLoading } = useProductCart();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <ProductItemBody product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          isLoading={IsLoading}
          disabled={isProductInCart || IsLoading}
          onClick={() => handlerAddProduct({ id: product.id })}
          Icon={isProductInCart ? CheckCircle : ShoppingBasket}
        >
          In cart
        </Button>
        <Button onClick={() => setIsShowModal(true)} Icon={ShoppingBag}>
          Buy
        </Button>
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
    </>
  );
};

export default CatalogItem;
