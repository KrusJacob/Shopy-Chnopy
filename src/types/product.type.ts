export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
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

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export type IProductType = "Default" | "InCart" | "InAdmin";
export type ISortingFilter = "popular" | "rating" | "min" | "max";

export type InCart = {
  selected?: boolean;
  quantity?: number;
  id: number;
};

export type IProductsInCart = IProduct & InCart;
