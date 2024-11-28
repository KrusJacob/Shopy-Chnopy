import { CategoryApi } from "@/shared/api/category";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useCategory = () => {
  const {
    data: categories = [],
    isLoading,
    isFetched,
  } = useQuery({
    ...CategoryApi.getCategoryListQuery(),
  });

  return { categories, isLoading, isFetched };
};

export default useCategory;
