"use client";
import { useSortStore } from "@/store/sorting/storeSort";
import React from "react";
import SortInput from "./SortInput";

const Sorting = () => {
  const changeSort = useSortStore((state) => state.changeSort);
  const activeSort = useSortStore((state) => state.sort);

  return (
    <div>
      <p className="text-xl font-medium mb-2">Sorts</p>
      <SortInput
        checked={activeSort === "popular"}
        sort="popular"
        changeSort={changeSort}
      >
        by popular
      </SortInput>
      <SortInput
        sort="rating"
        checked={activeSort === "rating"}
        changeSort={changeSort}
      >
        by rating
      </SortInput>
      <SortInput
        sort="min"
        checked={activeSort === "min"}
        changeSort={changeSort}
      >
        by min price
      </SortInput>
      <SortInput
        sort="max"
        checked={activeSort === "max"}
        changeSort={changeSort}
      >
        by max price
      </SortInput>
    </div>
  );
};

export default Sorting;
