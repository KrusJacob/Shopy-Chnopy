export const usePriceWithDiscount = (price: number = 0, discountValue: number = 0) => {
  return Math.round(price - (price / 100) * discountValue);
};
