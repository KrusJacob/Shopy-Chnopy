import { ProductApi } from "@/shared/api/product";
import { useCategoryStore } from "@/store/category/storeCategory";
import { useQuery } from "@tanstack/react-query";

const useProductList = () => {
  const category = useCategoryStore((state) => state.category);
  const {
    data: products = [],
    isLoading,
    isFetched,
  } = useQuery({ ...ProductApi.getProductListByCategoryIdQuery(category) });

  return { category, products, isFetched, isLoading };
};

export default useProductList;
