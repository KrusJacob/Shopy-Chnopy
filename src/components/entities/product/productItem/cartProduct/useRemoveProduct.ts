import { useToast } from "@/hooks/useToast";
import { UserApi } from "@/shared/api/user";
import { useCartStore } from "@/store/cart/StoreCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useRemoveProduct = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const products = useCartStore((state) => state.productsId);
  const removeProductToCart = useCartStore(
    (state) => state.removeProductToCart
  );

  const mutation = useMutation({
    mutationFn: UserApi.removeProductCartToUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      useToast.removeProductFromCart();
    },
  });

  const handlerRemoveProduct = (productId: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    if (session.data) {
      mutation.mutate({
        id: session.data.user.id,
        products: updatedProducts,
      });
      removeProductToCart(productId, session.data.user.id);
    }
  };
  return { handlerRemoveProduct, isPending: mutation.isPending };
};
export default useRemoveProduct;
