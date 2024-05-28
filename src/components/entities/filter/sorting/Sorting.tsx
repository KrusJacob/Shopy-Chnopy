"use client";
import { useSortStore } from "@/store/sorting/storeSort";
import React from "react";
import SortInput from "./SortInput";

const Sorting = () => {
  const changeSort = useSortStore((state) => state.changeSort);
  const activeSort = useSortStore((state) => state.sort);

  return (
    <div className="mt-5">
      <p className="text-2xl font-medium">Sorts</p>
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
      {/* <div className="flex mt-2">
        <input
          onChange={() => changeSort("popular")}
          checked={activeSort === "popular"}
          className="mr-2"
          type="checkbox"
          id="popular"
        />
        <label htmlFor="popular" className="whitespace-nowrap text-xl">
          by popular
        </label>
      </div>
      <div className="flex">
        <input
          onChange={() => changeSort("min")}
          checked={activeSort === "min"}
          className="mr-2"
          type="checkbox"
          id="min"
        />
        <label htmlFor="min" className="whitespace-nowrap text-xl">
          by min price
        </label>
      </div>
      <div className="flex">
        <input
          onChange={() => changeSort("max")}
          checked={activeSort === "max"}
          className="mr-2"
          type="checkbox"
          id="max"
        />
        <label htmlFor="max" className="whitespace-nowrap text-xl">
          by max price
        </label>
      </div> */}
    </div>
  );
};

export default Sorting;
