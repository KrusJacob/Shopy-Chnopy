"use client";
import { useSortStore } from "@/store/sorting/storeSort";
import React from "react";

const Sorting = () => {
  const changeSort = useSortStore((state) => state.changeSort);
  const activeSort = useSortStore((state) => state.sort);

  return (
    <div className="mt-5">
      <p className="text-2xl font-medium">Sorts</p>
      <div className="flex mt-2">
        <input
          onChange={() => changeSort("popular")}
          checked={activeSort === "popular"}
          className="mr-2"
          type="checkbox"
        />
        <span className="whitespace-nowrap text-xl">by popular</span>
      </div>
      <div className="flex">
        <input
          onChange={() => changeSort("min")}
          checked={activeSort === "min"}
          className="mr-2"
          type="checkbox"
        />
        <span className="whitespace-nowrap text-xl">by min price</span>
      </div>
      <div className="flex">
        <input
          onChange={() => changeSort("max")}
          checked={activeSort === "max"}
          className="mr-2"
          type="checkbox"
        />
        <span className="whitespace-nowrap text-xl">by max price</span>
      </div>
    </div>
  );
};

export default Sorting;
