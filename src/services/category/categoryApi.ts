import { BASE_URL } from "..";

// const URL = "http://localhost:3001/categories";
const URL = `${BASE_URL}/categories`;

export const categoryApi = {
  fetchCategories: async () => {
    const res = await fetch(`${URL}`);

    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },
};
