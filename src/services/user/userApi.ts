import { InCart, IProduct } from "@/types/product.type";
import { IUser } from "@/types/user.types";

const URL = "http://localhost:3001/users";

export const userApi = {
  fetchUsers: async () => {
    const res = await fetch(`${URL}`);

    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },
  getUsersByEmail: async (email: string): Promise<IUser[]> => {
    const res = await fetch(`${URL}?email=${email}`);
    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },
  getUsersById: async (id: string): Promise<IUser> => {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },
  createUser: async (user: IUser) => {
    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  },
  setProductCart: async (products: InCart[], userId: string) => {
    await fetch(`${URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify({
        productsInCart: products,
      }),
    });
  },
};
