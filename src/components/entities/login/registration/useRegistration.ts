import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import { UserApi } from "@/shared/api/user";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const useRegistration = () => {
  const router = useRouter();
  const handlerRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);

    const data = {
      email: String(formData.get("email")).toLocaleLowerCase().trim() as string,
      password: String(formData.get("password")).trim() as string,
    };
    UserApi.createUser(data.email, data.password)
      .then(async (user) => {
        await UserApi.createUserDoc(user.localId, user.idToken, data.email);
        router.push(navPaths.SIGNIN);
        useToast.successRegister();
      })
      .catch(() => {
        useToast.errorRegister();
      });
  };
  return { handlerRegistration };
};

export default useRegistration;
