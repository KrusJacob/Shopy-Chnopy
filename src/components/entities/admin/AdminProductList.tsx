import React from "react";
import ProductItem from "../product/productItem/ProductItem";
import { IProduct } from "@/types/product.type";

const AdminProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex flex-wrap border-l border-grayDark mt-2 pl-2 ">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} type="InAdmin" />
      ))}
    </div>
  );
};

export default AdminProductList;
