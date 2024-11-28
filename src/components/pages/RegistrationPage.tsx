"use client";

import React from "react";
import RegistrationForm from "../entities/login/registration/RegistrationForm";
import Button from "../UI/button/Button";
import { useRouter } from "next/navigation";
import { navPaths } from "@/services/navPaths";

const RegistrationPage = () => {
  const router = useRouter();
  return (
    <>
      <RegistrationForm />
      <Button
        onClick={() => router.push(navPaths.SIGNIN)}
        className="m-auto mt-10 text-sm"
      >
        Back
      </Button>
    </>
  );
};

export default RegistrationPage;
