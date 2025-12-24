import { useToast } from "@/hooks/useToast";
import { ProductApi } from "@/shared/api/product";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StateProps } from "./EditorItem";

const useEditProduct = (setIsEditor: (is: boolean) => void) => {
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation({
    mutationFn: ProductApi.updateProduct,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: [ProductApi.baseKey],
      });
      useToast.productChanged();
    },
    onSettled: () => {
      setIsEditor(false);
    },
    onError: () => {
      useToast.error();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: ProductApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProductApi.baseKey],
      });
      useToast.productDeleted();
    },
    onSettled: () => {
      setIsEditor(false);
    },
    onError: (error) => {
      useToast.error();
    },
  });

  const handlerSaveProduct = (product: IProduct, chandedValue: StateProps) => {
    const { discountValue, price, ...preparedProductValues } = chandedValue;
    const chandedProduct = {
      ...preparedProductValues,
      id: product.id,
      price: +price,
      discount: { value: +chandedValue.discountValue },
    };
    mutationUpdate.mutate(chandedProduct);
  };

  const handlerDeleteProduct = (productId: string) => {
    mutationDelete.mutate(productId);
  };

  return {
    handlerSaveProduct,
    isPendingEdit: mutationUpdate.isPending,
    handlerDeleteProduct,
    isPendingDelete: mutationDelete.isPending,
  };
};

export default useEditProduct;
