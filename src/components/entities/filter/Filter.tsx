import React from "react";
import FilterPrice from "./filterPrice.tsx/FilterPrice";
import Sorting from "./sorting/Sorting";
import Search from "./search/Search";

const Filter = () => {
  return (
    <div className="flex flex-col gap-6 p-4 mt-2 pb-6 rounded-xl backdrop-blur  ">
      <Search />
      <Sorting />
      <FilterPrice />
    </div>
  );
};

export default Filter;
