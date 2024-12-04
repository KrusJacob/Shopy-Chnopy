import { navPaths } from "@/services/navPaths";
import { UserApi } from "@/shared/api/user";
import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const useRegistration = () => {
  const router = useRouter();
  const handlerRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);

    const data: IUser = {
      email: String(formData.get("email")).toLocaleLowerCase() as string,
      password: formData.get("password") as string,
      productsInCart: [],
    };

    const allUsers = await UserApi.fetchUsers();
    if (allUsers.find((user: IUser) => user.email === data.email)) {
      alert("this email already registered");
    } else {
      UserApi.createUser(data);
      router.push(navPaths.SIGNIN);
      target.reset();
    }
  };
  return { handlerRegistration };
};

export default useRegistration;
