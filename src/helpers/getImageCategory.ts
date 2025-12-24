import { ICategory } from "@/types/product.type";

export const getImageCategory = (categoryName: string) => {
  switch (categoryName) {
    case "Clothes":
      return {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
      };
    case "Electronics":
      return {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/ZANVnHE.jpeg",
      };
    case "Furniture":
      return {
        id: 3,
        name: "Furniture",
        image: "https://i.imgur.com/Qphac99.jpeg",
      };
    case "Shoes":
      return {
        id: 4,
        name: "Shoes",
        image: "https://i.imgur.com/qNOjJje.jpeg",
      };
    case "Miscellaneous":
      return {
        id: 5,
        name: "Miscellaneous",
        image: "https://i.imgur.com/BG8J0Fj.jpg",
      };
    default:
      return {
        id: 5,
        name: "Miscellaneous",
        image: "https://i.imgur.com/BG8J0Fj.jpg",
      };
  }
};
