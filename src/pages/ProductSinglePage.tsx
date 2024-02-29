"use client";
import { productApi } from "@/services/product/productApi";

import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ShoppingBasket, ShoppingBag, CheckCircle, Star } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/UI/button/Button";
import { useRouter } from "next/navigation";
import Loader from "@/components/UI/loader/Loader";
import { useCartStore } from "@/store/cart/StoreCart";
import { usePriceWithDiscount } from "@/hooks/usePriceWithDiscount";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import Rating from "@/components/screens/product/Rating";
import FeedBackProductForm from "@/components/screens/product/FeedBackProductForm";

const ProductSinglePage = ({ id }: { id: string }) => {
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const productsId = useCartStore((state) => state.productsId);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const isProductInCart = !!productsId.find((item) => item.id.toString() === id);

  const { data: product, isLoading } = useQuery({
    queryKey: [`product`, `productId:${id}`],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });

  const onAddProductToCart = () => {
    if (session.data && product) {
      addProductToCart(product.id, session.data!.user.id);
      useToast.addProductToCart(product.title);
    } else router.push(navPaths.SIGNIN);
  };

  const priceWithDiscount = usePriceWithDiscount(product?.price, product?.discount?.value);
  const isDiscount = product && priceWithDiscount !== +product?.price;

  //
  const onVoteToProduct = () => {
    if (session.data) {
      setIsFeedback(!isFeedback);
    } else router.push(navPaths.SIGNIN);
  };
  //

  return (
    <div className="max-w-[1200px] m-auto ">
      <div>
        <Button Icon={ArrowLeft} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      {!isLoading && product ? (
        <div className="grid grid-cols-2 gap-2 m-auto mt-5">
          <div className="max-w-[600px]">
            <Swiper
              slidesPerView={1}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {product?.images.map((image) => (
                <SwiperSlide key={image}>
                  <img src={image} alt={image} style={{ width: 600 }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="p-6">
            <p className="lg:text-3xl text-2xl font-medium mb-4 text-center">{product?.title}</p>
            <p className="lg:text-xl text-md mb-6">{product?.description}</p>

            <Rating onClick={onVoteToProduct} rating={product.rating} />

            <div className="mt-10 flex gap-3 lg:text-2xl text-xl items-center font-medium">
              Price:<p className={`${isDiscount ? "line-through" : ""}`}> {product?.price}$</p>
              {isDiscount && <p className="text-redDark text-3xl">{priceWithDiscount}$</p>}
              {isDiscount && (
                <div className="text-white py-0.5 px-2 rounded bg-redDark">-{product.discount?.value}%</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <Button Icon={ShoppingBag}>Buy</Button>
              <Button
                onClick={() => onAddProductToCart()}
                disabled={isProductInCart}
                Icon={isProductInCart ? CheckCircle : ShoppingBasket}
              >
                In cart
              </Button>
            </div>
            <AnimatePresence>
              {isFeedback && <FeedBackProductForm setIsFeedback={setIsFeedback} product={product} />}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductSinglePage;
