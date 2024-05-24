import { ICategory } from "@/types/product.type";
import { motion } from "framer-motion";
import React from "react";

type ICategoryItemProps = {
  category: ICategory;
  currentCategory: string;
  changeCategory: (str: string) => void;
};

const CategoryItem = (props: ICategoryItemProps) => {
  const { category, currentCategory, changeCategory } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: category.id * 0.2 }}
      key={category.id}
      onClick={() => changeCategory(category.id.toString())}
      className={`group relative text-white md:text-2xl text-sm border-4 ${
        currentCategory === category.id.toString() ? "border-greenDark" : "border-white"
      } brightness-90 hover:brightness-110 duration-200 cursor-pointer rounded-md overflow-hidden`}
    >
      <span className="absolute bottom-1 left-2 group-hover:bottom-4 duration-200 ease-in">{category.name}</span>
      <img src={category.image} alt={category.image} className="w-[var(--categoryItem)] h-[var(--categoryItem)]" />
    </motion.div>
  );
};

export default CategoryItem;
