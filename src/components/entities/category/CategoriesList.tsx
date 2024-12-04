"use client";
import Loader from "@/components/UI/loader/Loader";
import { useCategoryStore } from "@/store/category/storeCategory";
import { ICategory } from "@/types/product.type";
import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({
  categories,
  isLoading,
}: {
  categories: ICategory[];
  isLoading: boolean;
}) => {
  const currentCategory = useCategoryStore((state) => state.category);
  const changeCategory = useCategoryStore((state) => state.changeCategory);

  return (
    <div className="max-w-[1040px] m-auto flex flex-wrap md:gap-4 gap-2">
      <div
        className={`w-[var(--categoryItem)] h-[var(--categoryItem)] box-content bg-primaryLight border- border-4 border-white flex justify-center items-center md:text-3xl text-lg text-white rounded-md`}
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
        <div className="flex justify-center items-center w-full h-[var(--categoryItem)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
