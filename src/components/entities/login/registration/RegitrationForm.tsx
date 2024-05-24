"use client";
import Button from "@/components/UI/button/Button";
import { userApi } from "@/services/user/userApi";
import { IUser } from "@/types/user.types";
import React, { FormEvent } from "react";

const RegitrationForm = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);

    const data: IUser = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      productsInCart: [],
    };

    const allUsers = await userApi.fetchUsers();
    if (allUsers.find((user: IUser) => user.email === data.email)) {
      alert("this email already registered");
    } else {
      userApi.createUser(data);
      target.reset();
    }
  };

  return (
    <div className="mt-20 text-center ">
      <h4 className="text-xl">Create new account</h4>
      <form onSubmit={onSubmit} className="mt-5 flex flex-col max-w-[300px] m-auto gap-3 text-xl">
        <input name="email" required placeholder="email" className="px-2 py-1 border rounded" type="email" />

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

export default RegitrationForm;
