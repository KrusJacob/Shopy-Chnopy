import { IProduct } from "@/types/product.type";
import { BASE_URL } from "..";

const URL = `${BASE_URL}/products`;

export const productApi = {
  fetchProducts: async (categoryId: string): Promise<IProduct[]> => {
    const res = await fetch(`${URL}/?category.id=${categoryId}`);

    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },

  getProductById: async (id: string): Promise<IProduct> => {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },

  getProductsById: async (productsId: number[]): Promise<IProduct[]> => {
    const res = await fetch(`${URL}?id_like=^(${productsId.join("|")})$`);
    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },

  changeProduct: async (product: IProduct) => {
    await fetch(`${URL}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify(product),
    });
  },
};
