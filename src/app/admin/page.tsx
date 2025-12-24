import AdminPage from "@/components/pages/AdminPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Shopy Chnopy",
  description: "Admin Page",
};

const PageAdmin = () => {
  return <AdminPage />;
};

export default PageAdmin;
