import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "./api-instance";
import { ICategory } from "@/types/product.type";

export const CategoryApi = {
  baseKey: "categories",
  getCategoryListQuery: () => {
    return queryOptions({
      queryKey: [CategoryApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<ICategory[]>(`/categories`, {
          signal: meta.signal,
        }),
    });
  },
};
