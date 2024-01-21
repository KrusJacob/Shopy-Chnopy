import { create } from "zustand";

type Store = {
  category: string;
  changeCategory: (newStatus: string) => void;
};

export const useCategoryStore = create<Store>((set) => ({
  category: "",
  changeCategory: (newCategory) => set((state) => ({ category: newCategory })),
}));
