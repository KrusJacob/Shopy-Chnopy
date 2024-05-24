import AdminPage from "@/components/pages/AdminPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Shopy Chnopy",
  description: "Admin Page",
};

const pageAdmin = () => {
  return <AdminPage />;
};

export default pageAdmin;
