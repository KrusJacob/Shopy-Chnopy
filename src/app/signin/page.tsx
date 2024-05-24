import SignInPage from "@/components/pages/SignInPage";
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
