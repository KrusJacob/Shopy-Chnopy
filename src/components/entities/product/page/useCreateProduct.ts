import { useToast } from "@/hooks/useToast";
import { ProductApi } from "@/shared/api/product";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: Omit<IProduct, "id">) =>
      ProductApi.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProductApi.baseKey],
      });
      useToast.productCreated();
    },
    onError: () => {
      useToast.error();
    },
  });

  const handlerCreateProduct = (product: Omit<IProduct, "id">) => {
    mutation.mutate(product);
  };

  return { handlerCreateProduct };
};
