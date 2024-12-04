import ProductSinglePage from "@/components/pages/ProductSinglePage";
import { jsonApiInstance } from "@/shared/api/api-instance";
import { IProduct } from "@/types/product.type";
import { Metadata } from "next";

import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const product = await jsonApiInstance<IProduct>(`/products/${id}`);

  return {
    title: product.title,
  };
}

const PageSingleProduct = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return <ProductSinglePage id={id} />;
};

export default PageSingleProduct;
