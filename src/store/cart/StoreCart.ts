import { create } from "zustand";

type InCart = {
  selected?: boolean;
  quantity?: number;
  id: number;
};

type Store = {
  productsId: InCart[];

  addProductToCart: (productID: number) => void;
  removeProductToCart: (productID: number, userId: string) => void;
  setProductCart: (products: InCart[]) => void;
  excludeProductCart: (productID: number) => void;
  changeQuantityProduct: (productId: number, quantity: number) => void;
};

export const useCartStore = create<Store>((set) => ({
  productsId: [],

  addProductToCart: (productId) =>
    set((state) => {
      return {
        ...state,
        productsId: [...state.productsId, { id: productId, selected: true }],
      };
    }),
  removeProductToCart: (productId, userId) =>
    set((state) => {
      return {
        ...state,
        productsId: [
          ...state.productsId.filter((item) => item.id !== productId),
        ],
      };
    }),

  setProductCart: (products) =>
    set((state) => ({
      ...state,
      productsId: products.map((item) => ({ ...item, selected: true })),
    })),
  excludeProductCart: (id) =>
    set((state) => ({
      ...state,
      productsId: state.productsId.map((item) => {
        if (item.id === id) {
          item.selected = !Boolean(item.selected);
        }
        return item;
      }),
    })),

  changeQuantityProduct: (productId, quantity) => {
    set((state) => ({
      ...state,
      productsId: state.productsId.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      }),
    }));
  },
}));
