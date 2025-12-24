import { UserApi } from "@/shared/api/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  token: string;
  localId: string;
  role: "admin" | "user";
  productsIdCart: string[];
  login: (payload: { email: string; password: string }) => Promise<void>;
  getUserData: () => void;
  logout: () => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      token: "",
      localId: "",
      role: "user",
      productsIdCart: [],
      async login(payload) {
        try {
          const user = await UserApi.loginUser(payload);
          set({ token: user.idToken, localId: user.localId });
        } catch (error) {
          throw error;
        }
      },
      async getUserData() {
        const { token, localId } = get();
        if (!token || !localId) return;
        try {
          const data = await UserApi.getUserData(localId, token);
          set({ role: data?.role, productsIdCart: data?.productsCart });
        } catch (error) {
          set({ token: "", localId: "", role: "user", productsIdCart: [] });

          useAuthStore.persist.clearStorage();
        }
      },
      logout: () => {
        set({ token: "", localId: "", role: "user", productsIdCart: [] });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, localId: state.localId }),
    }
  )
);
