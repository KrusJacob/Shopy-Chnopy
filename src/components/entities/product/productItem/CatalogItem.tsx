import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import { IProduct } from "@/types/product.type";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cart/StoreCart";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/UI/button/Button";
import { CheckCircle, ShoppingBag, ShoppingBasket } from "lucide-react";
import ProductItemBody from "./ProductItemBody";
import PaymentModal from "../../paymentModal/PaymentModal";
import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";

interface Props {
  product: IProduct;
}

const CatalogItem = ({ product }: Props) => {
  const router = useRouter();
  const session = useSession();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const productsId = useCartStore((state) => state.productsId);
  const isProductInCart = !!productsId.find((item) => item.id === product.id);

  const onAddProductToCart = () => {
    if (session.data) {
      addProductToCart(product.id, session.data!.user.id);
      useToast.addProductToCart(product.title);
    } else router.push(navPaths.SIGNIN);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <ProductItemBody product={product} />
        <ProductInfo product={product} />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          disabled={isProductInCart}
          onClick={() => onAddProductToCart()}
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
          totalPrice={usePriceWithDiscount(product.price, product.discount?.value)}
        />
      )}
    </>
  );
};

export default CatalogItem;
