import React from "react";
import FilterPrice from "./filterPrice.tsx/FilterPrice";
import Sorting from "./sorting/Sorting";
import Search from "./search/Search";

const Filter = () => {
  return (
    <div className="p-2 mt-2 pb-4 border-r border-l border-b border-grayDark  ">
      <Search />
      <Sorting />
      <FilterPrice />
    </div>
  );
};

export default Filter;
