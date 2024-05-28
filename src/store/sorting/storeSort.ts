import { ISortingFilter } from "@/types/product.type";
import { create } from "zustand";

type Store = {
  temp: string;
  sort: ISortingFilter;
  minPrice: number | null;
  maxPrice: number | null;
  changeTemp: (newTemp: string) => void;
  changeSort: (newSort: ISortingFilter) => void;
  changeMinPrice: (newMinPrice: string) => void;
  changeMaxPirce: (newMaxPrice: string) => void;
};

export const useSortStore = create<Store>((set) => ({
  temp: "",
  sort: "popular",
  minPrice: null,
  maxPrice: null,
  changeTemp: (newTemp) => set(() => ({ temp: newTemp })),
  changeSort: (newSort: ISortingFilter) => set(() => ({ sort: newSort })),
  changeMinPrice: (newMinPrice) => set(() => ({ minPrice: +newMinPrice })),
  changeMaxPirce: (newMaxPrice) => set(() => ({ maxPrice: +newMaxPrice })),
}));
