import { useToast } from "@/hooks/useToast";
import { ProductApi } from "@/shared/api/product";
import { IProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StateProps } from "./EditorItem";

const useEditProduct = (setIsEditor: (is: boolean) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  const handlerSaveProduct = (product: IProduct, chandedValue: StateProps) => {
    const { discountValue, price, ...preparedProductValues } = chandedValue;
    const chandedProduct = {
      ...preparedProductValues,
      id: product.id,
      price: +price,
      discount: { value: +chandedValue.discountValue },
    };
    mutation.mutate(chandedProduct);
  };

  return { handlerSaveProduct, isPending: mutation.isPending };
};

export default useEditProduct;
