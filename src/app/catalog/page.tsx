import CatalogPage from "@/components/pages/CatalogPage";
import { Metadata } from "next";
import React, { useState } from "react";

export const metadata: Metadata = {
  title: "Catalog | Shopy Chnopy",
  description: "Catalog Page",
};

const PageCatalog = () => {
  return <CatalogPage />;
};

export default PageCatalog;
