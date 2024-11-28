"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/UI/button/Button";
import { useRouter } from "next/navigation";
import Loader from "@/components/UI/loader/Loader";
import Product from "../entities/product/page/Product";
import { ProductApi } from "@/shared/api/product";

const ProductSinglePage = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: product, isLoading } = useQuery({
    ...ProductApi.getProductByID(id),
  });

  return (
    <div className="max-w-[1200px] m-auto px-2">
      <Button Icon={ArrowLeft} onClick={() => router.back()}>
        Back
      </Button>

      {!isLoading && product ? <Product product={product} /> : <Loader />}
    </div>
  );
};

export default ProductSinglePage;
