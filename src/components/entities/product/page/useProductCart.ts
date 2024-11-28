import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import { UserApi } from "@/shared/api/user";
import { useCartStore } from "@/store/cart/StoreCart";
import { InCart } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useProductCart = () => {
  const session = useSession();
  const router = useRouter();
  const products = useCartStore((state) => state.productsId);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: UserApi.addProductCartToUser,
    onSuccess(_, { newProduct }) {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      useToast.addProductToCart();
    },
  });

  const handlerAddProduct = (newProduct: InCart) => {
    if (session.data) {
      mutation.mutate({
        id: session.data.user.id,
        products,
        newProduct,
      });
      addProductToCart(newProduct.id);
    } else router.push(navPaths.SIGNIN);
  };
  return { handlerAddProduct, IsLoading: mutation.isPending };
};

export default useProductCart;
