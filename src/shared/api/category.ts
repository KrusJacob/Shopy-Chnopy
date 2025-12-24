import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "./api-instance";
import { ICategory } from "@/types/product.type";

const CATEGORY_URL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/categories`;

export const CategoryApi = {
  baseKey: "categories",
  getCategoryListQuery: () => {
    return queryOptions({
      queryKey: [CategoryApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<Record<string, ICategory>>(`${CATEGORY_URL}.json`, {
          signal: meta.signal,
        }),
      select: (data) =>
        Object.keys(data).map((key: string) => {
          return { ...data[key] };
        }),
    });
  },
};
