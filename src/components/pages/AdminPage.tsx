"use client";
import React, { useEffect, useLayoutEffect } from "react";
import Search from "@/components/entities/filter/search/Search";
import { useFilter } from "@/hooks/useFilter";
import Loader from "@/components/UI/loader/Loader";
import { useRouter } from "next/navigation";
import AdminCategoryList from "../entities/admin/AdminCategoryList";
import AdminProductList from "../entities/admin/AdminProductList";
import useCategory from "../entities/category/useCategory";
import useProductList from "../entities/product/productList/useProductList";
import { navPaths } from "@/services/navPaths";
import Button from "../UI/button/Button";
import { Plus } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const AdminPage = () => {
  const router = useRouter();
  const { role } = useUser();

  useLayoutEffect(() => {
    if (role !== "admin") {
      router.push(navPaths.HOME);
    }
  }, [role]);

  const { products, isFetched, isLoading } = useProductList();
  const { categories } = useCategory();

  const filteredProducts = useFilter(products);

  return (
    <div className="min-h-screen px-2">
      <div className="flex justify-between items-center gap-4">
        <Search />
        <Button Icon={Plus} onClick={() => router.push(navPaths.ADMIN_NEW)}>
          New product
        </Button>
      </div>

      <AdminCategoryList categories={categories} />
      {isLoading && <Loader />}
      {isFetched && <AdminProductList products={filteredProducts} />}
    </div>
  );
};

export default AdminPage;
