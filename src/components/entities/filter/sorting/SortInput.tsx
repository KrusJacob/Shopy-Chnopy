import { ISortingFilter } from "@/types/product.type";
import React, { ReactNode } from "react";

interface IProps {
  checked: boolean;
  changeSort: (sort: ISortingFilter) => void;
  children: ReactNode;
  sort: ISortingFilter;
}

const SortInput = ({ checked, changeSort, children, sort }: IProps) => {
  return (
    <div className="flex">
      <input
        onChange={() => changeSort(sort)}
        checked={checked}
        className="mr-2"
        type="checkbox"
        id={sort}
      />
      <label htmlFor={sort} className="whitespace-nowrap text-lg">
        {children}
      </label>
    </div>
  );
};

export default SortInput;
