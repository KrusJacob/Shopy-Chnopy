"use client";
import React, { useEffect, useLayoutEffect } from "react";

import ProductCreatePage from "@/components/pages/ProductCreatePage";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { navPaths } from "@/services/navPaths";

const PageAddNewProduct = () => {
  const router = useRouter();
  const { role } = useUser();

  useLayoutEffect(() => {
    if (role !== "admin") {
      router.push(navPaths.HOME);
    }
  }, [role]);

  return <ProductCreatePage />;
};

export default PageAddNewProduct;
