import { create } from "zustand";

type InCart = {
  selected?: boolean;
  quantity?: number;
  id: string;
};

type Store = {
  productsCart: InCart[];

  addProductToCart: (productID: string) => void;
  removeProductToCart: (productID: string) => void;
  setProductCart: (productsId: string[]) => void;
  excludeProductCart: (productID: string) => void;
  changeQuantityProduct: (productId: string, quantity: number) => void;
};

export const useCartStore = create<Store>((set) => ({
  productsCart: [],

  addProductToCart: (productId) =>
    set((state) => {
      return {
        productsCart: [
          ...state.productsCart,
          { id: productId, selected: true },
        ],
      };
    }),
  removeProductToCart: (productId) =>
    set((state) => {
      return {
        productsCart: [
          ...state.productsCart.filter((item) => item.id !== productId),
        ],
      };
    }),

  setProductCart: (productsId) =>
    set((state) => ({
      productsCart: productsId.map((id) => ({
        id,
        selected: true,
        quantity: 1,
      })),
    })),
  excludeProductCart: (id) =>
    set((state) => ({
      productsCart: state.productsCart.map((item) => {
        if (item.id === id) {
          item.selected = !Boolean(item.selected);
        }
        return item;
      }),
    })),

  changeQuantityProduct: (productId, quantity) => {
    set((state) => ({
      productsCart: state.productsCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      }),
    }));
  },
}));
