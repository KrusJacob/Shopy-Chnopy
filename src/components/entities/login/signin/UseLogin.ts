import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import { useAuthStore } from "@/store/auth/storeAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const UseLogin = () => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const timeError = setTimeout(() => {
      setError(false);
    }, 7000);

    return () => clearTimeout(timeError);
  }, [error]);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    login({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    })
      .then(() => {
        router.push(navPaths.CATALOG);
        useToast.loginIn();
      })
      .catch(() => {
        setError(true);
      });
  };

  return { handlerSubmit, error };
};

export default UseLogin;
