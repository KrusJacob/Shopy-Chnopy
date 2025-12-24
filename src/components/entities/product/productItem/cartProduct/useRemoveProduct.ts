import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { UserApi } from "@/shared/api/user";
import { useCartStore } from "@/store/cart/StoreCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  const { token, localId } = useUser();
  const products = useCartStore((state) => state.productsCart);
  const removeProductToCart = useCartStore(
    (state) => state.removeProductToCart
  );

  const mutation = useMutation({
    mutationFn: UserApi.updateProductCartUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      useToast.removeProductFromCart();
    },
  });

  const handlerRemoveProduct = (productId: string) => {
    const updatedProductsId = products
      .map((item) => item.id)
      .filter((id) => id !== productId);

    if (token && localId) {
      mutation.mutate({
        idToken: token,
        localId,
        productsId: updatedProductsId,
      });
      removeProductToCart(productId);
    }
  };
  return { handlerRemoveProduct, isPending: mutation.isPending };
};
export default useRemoveProduct;
