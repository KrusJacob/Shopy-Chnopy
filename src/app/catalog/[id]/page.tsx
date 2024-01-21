import ProductSinglePage from "@/pages/ProductSinglePage";
import { productApi } from "@/services/product/productApi";
import { Metadata } from "next";

import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const product = await productApi.getProductById(id);

  return {
    title: product.title,
  };
}

const PageSingleProduct = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return <ProductSinglePage id={id} />;
};

export default PageSingleProduct;
