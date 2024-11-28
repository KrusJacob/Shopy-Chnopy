import Button from "@/components/UI/button/Button";
import { useCategoryStore } from "@/store/category/storeCategory";
import { ICategory } from "@/types/product.type";
import React from "react";

interface Props {
  categories: ICategory[];
}

const AdminCategoryList = ({ categories }: Props) => {
  const category = useCategoryStore((state) => state.category);
  const changeCategory = useCategoryStore((state) => state.changeCategory);

  return (
    <div className="flex gap-2 my-4 overflow-x-auto">
      {categories.map((item) => (
        <Button
          key={item.id}
          className={`${
            category === item.id.toString() ? "bg-greenLight" : ""
          }`}
          onClick={() => changeCategory(item.id.toString())}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default AdminCategoryList;
