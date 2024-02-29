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

export type IProductStatus = "Default" | "InCart" | "InAdmin";

export type InCart = {
  quantity?: number;
  id: number;
};

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
