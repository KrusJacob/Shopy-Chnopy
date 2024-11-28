"use client";
import SideBar from "@/components/layouts/sidebar/SideBar";
import CategoriesList from "@/components/entities/category/CategoriesList";
import { useCategoryStore } from "@/store/category/storeCategory";
import React from "react";
import CatalogProduct from "../entities/product/productList/CatalogProduct";
import useCategory from "../entities/category/useCategory";

const CatalogPage = () => {
  const { categories, isLoading, isFetched } = useCategory();
  const category = useCategoryStore((state) => state.category);

  return (
    <div>
      <CategoriesList categories={categories} isLoading={isLoading} />
      {category && (
        <div className="grid xl:grid-cols-[360px_1fr] lg:grid-cols-[300px_1fr] grid-cols-1 mt-14">
          <SideBar />
          <CatalogProduct />
        </div>
      )}
      {isFetched && (
        <div className="text-center mt-8 text-3xl font-medium">
          Select category
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
