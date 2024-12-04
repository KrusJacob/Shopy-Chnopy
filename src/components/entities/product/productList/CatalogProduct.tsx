import React from "react";
import ProductList from "./ProductList";
import useProductList from "./useProductList";
import Loader from "@/components/UI/loader/Loader";

const CatalogProduct = () => {
  const { products, isFetched, isLoading } = useProductList();

  return (
    <div className="lg:mx-4 min-h-[500px] ">
      <div className="bg-gradient-to-br  from-greenDark to-greenLight flex items-center rounded-t-xl h-14 px-4">
        <h4 className="text-3xl text-white font-bold">
          {products[0]?.category.name}
        </h4>
      </div>
      {isLoading && <Loader />}
      <ProductList products={products} />
      {isFetched && !products.length && (
        <div className="flex justify-center py-10 text-xl">
          Proucts not found
        </div>
      )}
    </div>
  );
};

export default CatalogProduct;
