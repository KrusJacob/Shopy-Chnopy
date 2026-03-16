"use client";
import { Slider } from "@/components/UI/slider/Slider";
import { MAX_PRICE_RANGE } from "@/constant";
import { useSortStore } from "@/store/sorting/storeSort";
import React from "react";

const FilterPrice = () => {
  const rangePrice = useSortStore((state) => state.rangePrice);
  const changeRangePrice = useSortStore((state) => state.changeRangePrice);

  return (
    <div>
      <label htmlFor="#filter" className="text-xl font-medium mb-2">
        Price
      </label>
      <Slider
        value={rangePrice}
        min={0}
        max={MAX_PRICE_RANGE}
        step={10}
        onValueChange={changeRangePrice}
        className="py-2"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>${rangePrice[0]}</span>
        <span>${rangePrice[1]}</span>
      </div>
    </div>
  );
};

export default FilterPrice;
