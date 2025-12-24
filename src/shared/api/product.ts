import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "./api-instance";
import { IProduct } from "@/types/product.type";
import { UserApi } from "./user";

const PRODUCTS_URL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/products`;

export const ProductApi = {
  baseKey: "products",
  getProductListByCategoryIdQuery: (categoryId: string) => {
    return queryOptions({
      queryKey: [ProductApi.baseKey, "list", categoryId],
      queryFn: (meta) =>
        jsonApiInstance<Record<string, IProduct>>(
          `${PRODUCTS_URL}.json?orderBy="category/id"&equalTo=${categoryId}`,
          {
            signal: meta.signal,
          }
        ),
      placeholderData: keepPreviousData,
      select: (data) =>
        Object.keys(data).map((key: string) => {
          return { ...data[key], id: key };
        }),
    });
  },

  getProductByID: (id: string) => {
    return queryOptions({
      queryKey: [ProductApi.baseKey, id],
      queryFn: (meta) =>
        jsonApiInstance<IProduct>(`${PRODUCTS_URL}/${id}.json`, {
          signal: meta.signal,
        }),
    });
  },
  getProductListById: async (productsId: string[]) => {
    const data = await jsonApiInstance<Record<string, IProduct>>(
      `${PRODUCTS_URL}.json`,
      { method: "GET" }
    );
    const allProducts = Object.keys(data).map((key) => ({
      ...data[key],
      id: key,
    }));
    const filtered = allProducts.filter((item) => productsId.includes(item.id));
    await ProductApi.updateInvalidProduct(productsId, filtered);
    return filtered;
  },
  updateInvalidProduct: async (productsId: string[], filtered: IProduct[]) => {
    const validIds = filtered.map((p) => p.id);
    const invalidIds = productsId.filter((id) => !validIds.includes(id));
    const localId = localStorage.getItem("localId") || "";
    const idToken = localStorage.getItem("tokenShopyChnopy") || "";
    if (invalidIds.length > 0) {
      await UserApi.updateProductCartUser({
        localId,
        idToken,
        productsId: validIds,
      });
    }
  },

  updateProduct: (data: Partial<IProduct>) => {
    return jsonApiInstance<IProduct>(`${PRODUCTS_URL}/${data.id}.json`, {
      method: "PATCH",
      json: data,
    });
  },
  createProduct: (data: Omit<IProduct, "id">) => {
    return jsonApiInstance<IProduct>(`${PRODUCTS_URL}.json`, {
      method: "POST",
      json: data,
    });
  },
  deleteProduct: (id: string) => {
    return jsonApiInstance<IProduct>(`${PRODUCTS_URL}/${id}.json`, {
      method: "DELETE",
    });
  },
};
