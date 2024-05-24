"use client";
import RegitrationForm from "@/components/entities/login/registration/RegitrationForm";
import SigninForm from "@/components/entities/login/signin/SigninForm";
import Button from "@/components/UI/button/Button";

import React, { useState } from "react";

const SignInPage = () => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <>
      <>
        {isSignin ? <SigninForm /> : <RegitrationForm />}
        <Button onClick={() => setIsSignin(!isSignin)} className="m-auto mt-10 text-sm">
          {isSignin ? "Create account" : "Back"}
        </Button>
      </>
    </>
  );
};

export default SignInPage;
