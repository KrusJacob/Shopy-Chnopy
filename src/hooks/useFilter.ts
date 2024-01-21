"use string";
import { useSortStore } from "@/store/sorting/storeSort";
import { IProduct } from "@/types/product.type";

export const useFilter = (products: IProduct[]) => {
  const temp = useSortStore((state) => state.temp);
  const sort = useSortStore((state) => state.sort);
  const minPrice = useSortStore((state) => state.minPrice);
  const maxPrice = useSortStore((state) => state.maxPrice);

  const getFilteredProducts = () => {
    //temp
    let filteredProducts = [];
    filteredProducts = products.filter((product) => product.title.toLowerCase().includes(temp.toLowerCase()));

    // sort
    if (sort === "min" || sort === "max") {
      filteredProducts = filteredProducts.sort((x, y) => {
        return (x.price || 0) - (y.price || 0);
      });
      if (sort === "max") {
        filteredProducts.reverse();
      }
    }
    //minPrice|maxPrice
    filteredProducts = filteredProducts.filter((item: IProduct) => {
      if (minPrice && maxPrice) {
        return item.price > minPrice && item.price < maxPrice;
      }
      if (minPrice) {
        return item.price > minPrice;
      }
      if (maxPrice) {
        return item.price < maxPrice;
      }
      return item;
    });

    return filteredProducts;
  };

  return getFilteredProducts();
};
