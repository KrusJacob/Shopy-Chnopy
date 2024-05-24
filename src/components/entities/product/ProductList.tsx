"use client";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/product.type";
import React from "react";
import ProductItem from "./productItem/ProductItem";

import { productApi } from "@/services/product/productApi";
import { useCategoryStore } from "@/store/category/storeCategory";
import Loader from "@/components/UI/loader/Loader";
import { useFilter } from "@/hooks/useFilter";

const ProductList = () => {
  const category = useCategoryStore((state) => state.category);

  const {
    data: products = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["products", `categoryID:${category}`],
    queryFn: () => productApi.fetchProducts(category),
    enabled: !!category,
  });

  const filteredProducts = useFilter(products);

  return (
    <div className="lg:mx-4 min-h-[500px] ">
      <div className="bg-gradient-to-br  from-greenDark to-greenLight flex items-center rounded-t-xl h-14 px-4">
        <h4 className="text-3xl text-white font-bold">{products[0]?.category.name}</h4>
      </div>
      {isLoading && <Loader />}
      {isFetched && (
        <>
          <div className="flex flex-wrap border-l border-r border-grayDark mt-2 px-2">
            {filteredProducts.map((product: IProduct) => {
              return <ProductItem key={product.id} product={product} type="Default" />;
            })}
          </div>
        </>
      )}
      {isFetched && !filteredProducts.length && (
        <div className="flex justify-center py-10 text-xl">Proucts not found</div>
      )}
    </div>
  );
};

export default ProductList;
