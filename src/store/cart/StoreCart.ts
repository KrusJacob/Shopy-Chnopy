import Cart from "@/components/header/Cart";
import { userApi } from "@/services/user/userApi";
import { IProduct } from "@/types/product.type";

import { create } from "zustand";

type InCart = {
  selected?: boolean;
  quantity?: number;
  id: number;
};

type IProductInCart = IProduct & InCart;

type Store = {
  productsInCart: IProductInCart[];
  productsId: InCart[];

  addProductToCart: (productID: number, userId: string) => void;
  removeProductToCart: (productID: number, userId: string) => void;
  setProductCart: (products: InCart[]) => void;
  excludeProductCart: (productID: number) => void;
  changeQuantityProduct: (productId: number, quantity: number) => void;
  // addProductToCart: (product: IProduct, userId: string) => void;
  // removeProductToCart: (id: number, userId: string) => void;
  // setProductCart: (products: IProduct[]) => void;
  // excludeProductCart: (id: number) => void;
  // changeQuantityProduct: (productId: number, quantity: number) => void;
};

export const useCartStore = create<Store>((set) => ({
  productsInCart: [],
  productsId: [],

  addProductToCart: (productId, userId) =>
    set((state) => {
      userApi.setProductCart([...state.productsId, { id: productId, selected: true }], userId);

      console.log("productId", productId);
      return { ...state, productsId: [...state.productsId, { id: productId, selected: true }] };
    }),
  removeProductToCart: (productId, userId) =>
    set((state) => {
      userApi.setProductCart([...state.productsId.filter((item) => item.id !== productId)], userId);
      return { ...state, productsId: [...state.productsId.filter((item) => item.id !== productId)] };
    }),

  setProductCart: (products) =>
    set((state) => ({ ...state, productsId: products.map((item) => ({ ...item, selected: true })) })),
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

  //

  // addProductToCart: (product, userId) =>
  //   set((state) => {
  //     userApi.setProductCart([...state.productsInCart, product], userId);
  //     return { ...state, productsInCart: [...state.productsInCart, { ...product, notSelected: false }] };
  //   }),
  // removeProductToCart: (productId, userId) =>
  //   set((state) => {
  //     userApi.setProductCart([...state.productsInCart.filter((item) => item.id !== productId)], userId);
  //     return { ...state, productsInCart: [...state.productsInCart.filter((item) => item.id !== productId)] };
  //   }),

  // setProductCart: (products) =>
  //   set((state) => ({ ...state, productsInCart: products.map((item) => ({ ...item, notSelected: false })) })),
  // excludeProductCart: (id) =>
  //   set((state) => ({
  //     ...state,
  //     productsInCart: state.productsInCart.map((item) => {
  //       if (item.id === id) {
  //         item.notSelected = !Boolean(item.notSelected);
  //       }
  //       return item;
  //     }),
  //   })),

  // changeQuantityProduct: (productId, quantity) => {
  //   set((state) => ({
  //     ...state,
  //     productsInCart: state.productsInCart.map((item) => {
  //       if (item.id === productId) {
  //         return { ...item, quantity: quantity };
  //       }
  //       return item;
  //     }),
  //   }));
  // },
}));
