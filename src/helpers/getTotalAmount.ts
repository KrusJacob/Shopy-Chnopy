import { usePriceWithDiscount } from "@/helpers/getPriceWithDiscount";
import { IProductsInCart } from "@/types/product.type";

export const getTotalAmount = (products: IProductsInCart[]) => {
  return products.reduce((acc, product) => {
    let price = usePriceWithDiscount(product.price, product.discount?.value);
    if (!product.selected) {
      price = 0;
    }
    return acc + price * (product?.quantity || 1);
  }, 0);
};
