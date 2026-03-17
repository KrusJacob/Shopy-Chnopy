import React, { useState } from "react";
import ProductInfo from "../ProductInfo";
import { IProduct } from "@/types/product.type";
import Button from "@/components/UI/button/Button";
import { CheckCircle, ShoppingBag, ShoppingBasket } from "lucide-react";
import ProductImage from "../ProductImage";
import PaymentModal from "../../../paymentModal/PaymentModal";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import useProductCart from "../../page/useProductCart";
import Badge from "@/components/UI/badge/Badge";

interface Props {
  product: IProduct;
  isProductInCart: boolean;
}

const CatalogItem = ({ product, isProductInCart }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const { handlerAddProduct, IsLoading } = useProductCart();

  return (
    <div className="flex flex-col h-full ">
      <div className="group relative flex flex-1 flex-col gap-2 overflow-hidden  transition-all ">
        <ProductImage product={product} />
        <ProductInfo product={product} />
        {product.discount.value > 0 && (
          <Badge value={`-${product.discount.value}%`} />
        )}
      </div>
      <div className="flex justify-between gap-4 p-4">
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
    </div>
  );
};

export default CatalogItem;
