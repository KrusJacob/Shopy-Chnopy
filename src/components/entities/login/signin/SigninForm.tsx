"use state";
import Button from "@/components/UI/button/Button";
import React from "react";
import UseLogin from "./UseLogin";

const SigninForm = () => {
  const { handlerSubmit, error } = UseLogin();

  return (
    <div className="mt-20 text-center ">
      <h4 className="text-xl">Login</h4>
      <form
        onSubmit={handlerSubmit}
        className="flex mt-5 flex-col max-w-[300px] m-auto gap-3 text-xl"
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
        <Button className="bg-white">Login</Button>
      </form>
      {error && (
        <p className="text-red-600 font-bold text-xl text-center mt-2">
          The data is incorrect
        </p>
      )}
    </div>
  );
};

export default SigninForm;
