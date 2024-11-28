"use client";
import React, { useEffect } from "react";
import Search from "@/components/entities/filter/search/Search";
import { useFilter } from "@/hooks/useFilter";
import Loader from "@/components/UI/loader/Loader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AdminCategoryList from "../entities/admin/AdminCategoryList";
import AdminProductList from "../entities/admin/AdminProductList";
import useCategory from "../entities/category/useCategory";
import useProductList from "../entities/product/productList/useProductList";

const AdminPage = () => {
  const session = useSession();

  useEffect(() => {
    if (session.data && +session.data?.user.id !== 1) {
      redirect("/");
    }
  }, [session]);

  const { products, isFetched, isLoading } = useProductList();
  const { categories } = useCategory();

  const filteredProducts = useFilter(products);

  if (session.status === "loading") {
    return <Loader />;
  }

  return (
    <div className="min-h-screen px-2">
      {session.data?.user && (
        <>
          <Search />
          <AdminCategoryList categories={categories} />
          {isLoading && <Loader />}
          {isFetched && <AdminProductList products={filteredProducts} />}
        </>
      )}
    </div>
  );
};

export default AdminPage;
