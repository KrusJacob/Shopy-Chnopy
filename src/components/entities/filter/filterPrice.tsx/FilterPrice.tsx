"use client";
import { Slider } from "@/components/UI/slider/Slider";
import { MAX_PRICE_RANGE } from "@/constant";
import useDebounce from "@/hooks/useDebounce";
import { useSortStore } from "@/store/sorting/storeSort";
import React, { useEffect, useState } from "react";

const FilterPrice = () => {
  const rangePrice = useSortStore((state) => state.rangePrice);
  const [previewRange, setPreviewRange] = useState(rangePrice);
  const changeRangePrice = useSortStore((state) => state.changeRangePrice);

  const debouncedRange = useDebounce(previewRange, 100);

  useEffect(() => {
    changeRangePrice(debouncedRange);
  }, [debouncedRange]);

  const handleValueChange = (value: number[]) => {
    setPreviewRange(value);
  };

  return (
    <div>
      <label htmlFor="#filter" className="text-xl font-medium mb-2">
        Price
      </label>
      <Slider
        value={previewRange}
        min={0}
        max={MAX_PRICE_RANGE}
        step={10}
        onValueChange={handleValueChange}
        className="py-2"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>${previewRange[0]}</span>
        <span>${previewRange[1]}</span>
      </div>
    </div>
  );
};

export default FilterPrice;
