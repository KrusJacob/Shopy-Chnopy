import { useAuthStore } from "@/store/auth/storeAuth";

export const useUser = () => {
  const token = useAuthStore((state) => state.token);
  const localId = useAuthStore((state) => state.localId);
  const role = useAuthStore((state) => state.role);
  const productsCart = useAuthStore((state) => state.productsIdCart);

  return { isAuth: !!token, token, localId, role, productsCart };
};
