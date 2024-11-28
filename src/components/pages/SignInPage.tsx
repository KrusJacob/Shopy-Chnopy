"use client";

import SigninForm from "@/components/entities/login/signin/SigninForm";
import Button from "@/components/UI/button/Button";
import { navPaths } from "@/services/navPaths";
import { useRouter } from "next/navigation";

import React from "react";

const SignInPage = () => {
  const router = useRouter();

  return (
    <>
      <SigninForm />
      <Button
        onClick={() => router.push(navPaths.REGISTRATION)}
        className="m-auto mt-10 text-sm"
      >
        Create account
      </Button>
    </>
  );
};

export default SignInPage;
