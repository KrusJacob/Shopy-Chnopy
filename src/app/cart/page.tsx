import CartPage from "@/components/pages/CartPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart | Shopy Chnopy",
  description: "Cart Page",
};

const PageCart = () => {
  return <CartPage />;
};

export default PageCart;
