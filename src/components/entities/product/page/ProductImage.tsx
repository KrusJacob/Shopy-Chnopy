import { Navigation, Pagination } from "swiper/modules";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProduct } from "@/types/product.type";

const ProductImage = ({ product }: { product: IProduct }) => {
  return (
    <div className="max-w-[720px] relative overflow-hidden  md">
      <Swiper
        className="absolute top-0 left-0 object-cover w-full h-full "
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {product?.images.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImage;
