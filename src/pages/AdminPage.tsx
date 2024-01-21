"use client";
import ProductItem from "@/components/screens/product/ProductItem";
import { productApi } from "@/services/product/productApi";
import { useCategoryStore } from "@/store/category/storeCategory";
import { ICategory, IProduct } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Search from "@/components/screens/search/Search";
import { useFilter } from "@/hooks/useFilter";
import { categoryApi } from "@/services/category/categoryApi";
import Button from "@/components/UI/button/Button";
import Loader from "@/components/UI/loader/Loader";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const AdminPage = () => {
  const session = useSession();
  const router = useRouter();
  const category = useCategoryStore((state) => state.category);
  const changeCategory = useCategoryStore((state) => state.changeCategory);

  useEffect(() => {
    if (session.data && +session.data?.user.id !== 1) {
      redirect("/");
    }
  }, [session]);

  const {
    data: products = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["products", `categoryID:${category}`],
    queryFn: () => productApi.fetchProducts(category),
    enabled: !!category,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.fetchCategories(),
  });

  const filteredProducts = useFilter(products);

  if (session.status === "loading") {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      {session.data?.user && (
        <>
          <div>
            <Search />
          </div>
          <div className="flex gap-2 my-4">
            {categories.map((item: ICategory) => (
              <Button
                key={item.id}
                className={`${category === item.id.toString() ? "bg-greenLight" : ""}`}
                onClick={() => changeCategory(item.id.toString())}
              >
                {item.name}
              </Button>
            ))}
          </div>
          {isLoading && <Loader />}
          {isFetched && (
            <>
              <div className="flex flex-wrap border-l border-grayDark mt-2 pl-2">
                {filteredProducts.map((product: IProduct) => (
                  <ProductItem key={product.id} product={product} status="InAdmin" />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;
