import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const UseLogin = () => {
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeError = setTimeout(() => {
      setError(false);
    }, 7000);

    return () => clearTimeout(timeError);
  }, [error]);

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: String(formData.get("email")).toLocaleLowerCase(),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push(navPaths.CATALOG);
      useToast.loginIn();
    } else {
      setError(true);
    }
  };

  return { handlerSubmit, error };
};

export default UseLogin;
