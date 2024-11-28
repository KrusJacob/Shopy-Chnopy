import { IUser } from "@/types/user.types";
import { jsonApiInstance } from "./api-instance";
import { InCart } from "@/types/product.type";

export const UserApi = {
  fetchUsers: () => {
    return jsonApiInstance<IUser[]>(`/users`, {
      method: "GET",
    });
  },
  createUser: (data: IUser) => {
    return jsonApiInstance<IUser>(`/users`, {
      method: "POST",
      json: data,
    });
  },
  getUser: (id: string) => {
    return jsonApiInstance<IUser>(`/users/${id}`, {
      method: "GET",
    });
  },
  loginUser: ({ login, password }: { login: string; password: string }) => {
    return jsonApiInstance<IUser[]>(
      `/users?login=${login}&password=${password}`
    ).then((r) => r[0] as IUser | undefined);
  },
  addProductCartToUser: async ({
    id,
    products,
    newProduct,
  }: {
    id: string;
    products: InCart[];
    newProduct: InCart;
  }) => {
    return jsonApiInstance(`/users/${id}`, {
      method: "PATCH",
      json: { productsInCart: [...products, newProduct] },
    });
  },
  removeProductCartToUser: async ({
    id,
    products,
  }: {
    id: string;
    products: InCart[];
  }) => {
    return jsonApiInstance(`/users/${id}`, {
      method: "PATCH",
      json: { productsInCart: products },
    });
  },
};
