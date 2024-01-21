import { create } from "zustand";

type Store = {
  temp: string;
  sort: string;
  minPrice: number | null;
  maxPrice: number | null;
  changeTemp: (newTemp: string) => void;
  changeSort: (newSort: string) => void;
  changeMinPrice: (newMinPrice: string) => void;
  changeMaxPirce: (newMaxPrice: string) => void;
};

export const useSortStore = create<Store>((set) => ({
  temp: "",
  sort: "popular",
  minPrice: null,
  maxPrice: null,
  changeTemp: (newTemp) => set((state) => ({ temp: newTemp })),
  changeSort: (newSort) => set((state) => ({ sort: newSort })),
  changeMinPrice: (newMinPrice) => set((state) => ({ minPrice: +newMinPrice })),
  changeMaxPirce: (newMaxPrice) => set((state) => ({ maxPrice: +newMaxPrice })),
}));
