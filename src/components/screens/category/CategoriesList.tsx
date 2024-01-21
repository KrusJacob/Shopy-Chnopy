"use client";
import Loader from "@/components/UI/loader/Loader";
import { categoryApi } from "@/services/category/categoryApi";
import { useCategoryStore } from "@/store/category/storeCategory";
import { ICategory } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const currentCategory = useCategoryStore((state) => state.category);
  const changeCategory = useCategoryStore((state) => state.changeCategory);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.fetchCategories(),
  });

  return (
    <div className="flex flex-wrap gap-4 justify-start ">
      <div
        className={`w-[var(--categoryItem)] h-[var(--categoryItem)] box-content bg-redLight border- border-4 border-white flex justify-center items-center text-3xl text-white rounded-md`}
      >
        Categories
      </div>
      {!isLoading ? (
        categories.map((category: ICategory, i: number) => {
          if (i >= 5) return;
          return (
            <CategoryItem
              key={category.id}
              category={category}
              currentCategory={currentCategory}
              changeCategory={changeCategory}
            />
          );
        })
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
