"use client";
import SideBar from "@/components/layouts/sidebar/SideBar";
import CategoriesList from "@/components/entities/category/CategoriesList";
import ProductList from "@/components/entities/product/ProductList";
import { useCategoryStore } from "@/store/category/storeCategory";
import React from "react";

const CatalogPage = () => {
  const category = useCategoryStore((state) => state.category);

  return (
    <div>
      <CategoriesList />
      {category ? (
        <div className="grid xl:grid-cols-[360px_1fr] lg:grid-cols-[300px_1fr] grid-cols-1 mt-14">
          <SideBar />
          <ProductList />
        </div>
      ) : (
        <div className="text-center mt-8 text-3xl font-medium">Select category</div>
      )}
    </div>
  );
};

export default CatalogPage;
