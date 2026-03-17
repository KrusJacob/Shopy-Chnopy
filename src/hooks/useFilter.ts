import { useSortStore } from "@/store/sorting/storeSort";
import { IProduct } from "@/types/product.type";

export const useFilter = (products: IProduct[]) => {
  const temp = useSortStore((state) => state.temp);
  const sort = useSortStore((state) => state.sort);
  const rangePrice = useSortStore((state) => state.rangePrice);

  const getFilteredProducts = () => {
    let filteredProducts = [];
    //temp
    filteredProducts = temp
      ? products.filter((product) => RegExp(temp, "i").test(product.title))
      : products;

    // sort
    if (sort === "min" || sort === "max") {
      filteredProducts = filteredProducts.sort((x, y) => {
        return (x.price || 0) - (y.price || 0);
      });
      if (sort === "max") {
        filteredProducts.reverse();
      }
    }
    if (sort === "popular") {
      filteredProducts = filteredProducts
        .sort((x, y) => {
          return (x.rating.totalValue || 0) - (y.rating.totalValue || 0);
        })
        .reverse();
    }
    if (sort === "rating") {
      filteredProducts = filteredProducts
        .sort((x, y) => {
          return (x.rating.value || 0) - (y.rating.value || 0);
        })
        .reverse();
    }
    //rangePrice
    // filteredProducts = filteredProducts.filter((item: IProduct) => {
    //   if (rangePrice[0] && rangePrice[1]) {
    //     return item.price > rangePrice[0] && item.price < rangePrice[1];
    //   }
    //   if (rangePrice[0]) {
    //     return item.price > rangePrice[0];
    //   }
    //   if (rangePrice[1]) {
    //     return item.price < rangePrice[1];
    //   }
    //   return item;
    // });
    if (!rangePrice || !Array.isArray(rangePrice)) {
      return filteredProducts;
    }

    const [min, max] = rangePrice;

    filteredProducts = filteredProducts.filter((item: IProduct) => {
      const price = item.price || 0;

      if (min != null && max != null) return price > min && price < max;
      if (min != null) return price > min;
      if (max != null) return price < max;
      return true;
    });

    return filteredProducts;
  };

  return getFilteredProducts();
};
