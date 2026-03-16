import React from "react";
import ProductItem from "../product/productItem/ProductItem";
import { IProduct } from "@/types/product.type";

const AdminProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-2 ">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} type="InAdmin" />
      ))}
    </div>
  );
};

export default AdminProductList;
