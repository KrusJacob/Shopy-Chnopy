"use client";
import useDebounce from "@/hooks/useDebounce";
import { useSortStore } from "@/store/sorting/storeSort";
import React, { useEffect, useState } from "react";

const FilterPrice = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const changeMinPrice = useSortStore((state) => state.changeMinPrice);
  const changeMaxPirce = useSortStore((state) => state.changeMaxPirce);
  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);

  useEffect(() => {
    changeMinPrice(debouncedMinPrice);
  }, [debouncedMinPrice]);

  useEffect(() => {
    changeMaxPirce(debouncedMaxPrice);
  }, [debouncedMaxPrice]);

  return (
    <div className="mt-5">
      <label htmlFor="#filter" className="text-2xl font-medium">
        Price
      </label>
      <div
        id="filter"
        className="grid grid-cols-2 items-center gap-2 w-full mt-2 "
      >
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
          min="0"
          max="9999"
          placeholder="min"
          className="px-4 py-2 text-xl"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          min="0"
          max="9999"
          placeholder="max"
          className="px-4 py-2 text-xl"
        />
      </div>
    </div>
  );
};

export default FilterPrice;
