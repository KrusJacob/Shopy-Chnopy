import { IProduct } from "./product.type";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  productsInCart: IProduct[];
}
