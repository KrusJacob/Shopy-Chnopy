// const URL = "https://api.escuelajs.co/api/v1/categories";
const URL = "http://localhost:3001/categories";

export const categoryApi = {
  fetchCategories: async () => {
    const res = await fetch(`${URL}`);

    if (!res.ok) {
      throw new Error("Fetch error");
    }
    return await res.json();
  },
};
