import AdminPage from "@/pages/AdminPage";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export const metadata: Metadata = {
  title: "Admin | Shopy Chnopy",
  description: "Admin Page",
};

const pageAdmin = () => {
  return <AdminPage />;
};

export default pageAdmin;
