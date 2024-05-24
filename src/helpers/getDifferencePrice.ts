import { usePriceWithDiscount } from "./getPriceWithDiscount";

export const getDifferencePrice = (initalPrice: number, discount: number) => {
  return Math.round(initalPrice - usePriceWithDiscount(initalPrice, discount));
};
