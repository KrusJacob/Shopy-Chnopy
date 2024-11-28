import RegistrationPage from "@/components/pages/RegistrationPage";
import SignInPage from "@/components/pages/SignInPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Registration | Shopy Chnopy",
  description: "Registration Page",
};

const PageLogin = () => {
  return (
    <>
      <RegistrationPage />
    </>
  );
};

export default PageLogin;
