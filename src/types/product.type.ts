export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategoryProduct;
  rating: IRating;
  discount?: IDiscount;
}

interface IDiscount {
  value: number;
}

interface IRating {
  voted: number;
  totalValue: number;
  value: number;
}

export type IProductType = "Default" | "InCart" | "InAdmin";

export type InCart = {
  selected?: boolean;
  quantity?: number;
  id: number;
};

export type IProductsInCart = IProduct & InCart;

export interface ICategoryProduct {
  id: number;
  name: string;
  image: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}
