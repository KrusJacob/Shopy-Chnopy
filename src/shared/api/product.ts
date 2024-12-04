import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "./api-instance";
import { IProduct } from "@/types/product.type";

export const ProductApi = {
  baseKey: "products",
  getProductListByCategoryIdQuery: (categoryId: string) => {
    return queryOptions({
      queryKey: [ProductApi.baseKey, "list", categoryId],
      queryFn: (meta) =>
        jsonApiInstance<IProduct[]>(`/products?category.id=${categoryId}`, {
          signal: meta.signal,
        }),
      placeholderData: keepPreviousData,
    });
  },

  getProductByID: (id: string) => {
    return queryOptions({
      queryKey: [ProductApi.baseKey, id],
      queryFn: (meta) =>
        jsonApiInstance<IProduct>(`/products/${id}`, { signal: meta.signal }),
    });
  },
  getProductListById: async (productsId: number[]) => {
    return jsonApiInstance<IProduct[]>(
      `/products/?id_like=^(${productsId.join("|")})$`,
      {
        method: "GET",
      }
    );
  },

  updateProduct: (data: Partial<IProduct>) => {
    return jsonApiInstance<IProduct>(`/products/${data.id}`, {
      method: "PATCH",
      json: data,
    });
  },
};
