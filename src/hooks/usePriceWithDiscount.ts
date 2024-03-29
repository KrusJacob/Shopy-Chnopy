export const usePriceWithDiscount = (price: number = 0, discount: number = 0) => {
  return Math.round(price - (price / 100) * discount);
};

export const getDifferencePrice = (initalPrice: number, discount: number) => {
  return Math.round(initalPrice - usePriceWithDiscount(initalPrice, discount));
};
