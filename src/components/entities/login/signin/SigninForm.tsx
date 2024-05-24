"use state";
import Button from "@/components/UI/button/Button";
import { useToast } from "@/hooks/useToast";
import { navPaths } from "@/services/navPaths";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { FormEvent, useEffect, useState } from "react";

const SigninForm = () => {
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeError = setTimeout(() => {
      setError(false);
    }, 7000);

    return () => clearTimeout(timeError);
  }, [error]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res && !res.error) {
      router.push(navPaths.CART);
      useToast.loginIn();
    } else {
      setError(true);
    }
  };
  return (
    <div className="mt-20 text-center ">
      <h4 className="text-xl">SignIn</h4>
      <form onSubmit={onSubmit} className="flex mt-5 flex-col max-w-[300px] m-auto gap-3 text-xl">
        <input name="email" required placeholder="email" className="px-2 py-1 border rounded" type="email" />

        <input
          name="password"
          required
          maxLength={24}
          placeholder="password"
          className="px-2 py-1 border rounded"
          type="password"
        />
        <Button className="bg-white">Login</Button>
      </form>
      {error && <p className="text-redDark font-bold text-xl text-center mt-2">The data is incorrect</p>}
    </div>
  );
};

export default SigninForm;
