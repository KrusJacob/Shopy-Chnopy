"use client";
import Button from "@/components/UI/button/Button";

import React from "react";
import useRegistration from "./useRegistration";

const RegistrationForm = () => {
  const { handlerRegistration } = useRegistration();

  return (
    <div className="mt-20 text-center ">
      <h4 className="text-xl">Create new account</h4>
      <form
        onSubmit={handlerRegistration}
        className="mt-5 flex flex-col max-w-[300px] m-auto gap-3 text-xl"
      >
        <input
          name="email"
          required
          placeholder="email"
          className="px-2 py-1 border rounded"
          type="email"
        />

        <input
          name="password"
          required
          maxLength={24}
          placeholder="password"
          className="px-2 py-1 border rounded"
          type="password"
        />
        <Button className="bg-white">Submit</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
