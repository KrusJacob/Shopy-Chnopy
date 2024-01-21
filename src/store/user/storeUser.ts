import { create } from "zustand";

type Store = {
  userId: string;
  setUserId: (userId: string) => void;
};

export const useSortStore = create<Store>((set) => ({
  userId: "",
  setUserId: (userId) => set((state) => ({ userId: userId })),
}));
