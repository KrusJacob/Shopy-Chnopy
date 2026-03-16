import { MAX_PRICE_RANGE } from "@/constant";
import { ISortingFilter } from "@/types/product.type";
import { create } from "zustand";

type Store = {
  temp: string;
  sort: ISortingFilter;
  rangePrice: number[];
  changeTemp: (newTemp: string) => void;
  changeSort: (newSort: ISortingFilter) => void;
  changeRangePrice: (newRangePrice: number[]) => void;
};

export const useSortStore = create<Store>((set) => ({
  temp: "",
  sort: "popular",
  rangePrice: [0, MAX_PRICE_RANGE],
  changeTemp: (newTemp) => set(() => ({ temp: newTemp })),
  changeSort: (newSort: ISortingFilter) => set(() => ({ sort: newSort })),
  changeRangePrice: (newRangePrice) =>
    set(() => ({ rangePrice: newRangePrice })),
}));
