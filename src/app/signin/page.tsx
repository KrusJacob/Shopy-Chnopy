import RegitrationForm from "@/components/screens/login/registration/RegitrationForm";
import Button from "@/components/UI/button/Button";
import SignInPage from "@/pages/SignInPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SignIn | Shopy Chnopy",
  description: "SignIn Page",
};

const PageLogin = () => {
  return (
    <>
      <SignInPage />
    </>
  );
};

export default PageLogin;
