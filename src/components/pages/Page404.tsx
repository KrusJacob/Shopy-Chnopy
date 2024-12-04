"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../UI/button/Button";
import { ArrowLeft } from "lucide-react";

const Page404 = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1200px] m-auto px-2">
      <Button Icon={ArrowLeft} onClick={() => router.back()}>
        Back
      </Button>
      <div className="flex mt-4 justify-center items-center flex-col">
        <p className="text-6xl">404</p>
        <p>The page was not found</p>
      </div>
    </div>
  );
};

export default Page404;
