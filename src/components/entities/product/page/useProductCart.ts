import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { navPaths } from "@/services/navPaths";
import { UserApi } from "@/shared/api/user";
import { useCartStore } from "@/store/cart/StoreCart";
import { InCart } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useProductCart = () => {
  const router = useRouter();
  const { token, localId } = useUser();
  const products = useCartStore((state) => state.productsCart);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: UserApi.updateProductCartUser,
    onSuccess() {
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
      useToast.addProductToCart();
    },
  });

  const handlerAddProduct = (newProduct: InCart) => {
    if (token && localId) {
      const productsId = [...products.map((item) => item.id), newProduct.id];
      mutation.mutate({ idToken: token, localId, productsId });

      addProductToCart(newProduct.id);
    } else router.push(navPaths.SIGNIN);
  };
  return { handlerAddProduct, IsLoading: mutation.isPending };
};

export default useProductCart;
