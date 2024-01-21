import Filter from "@/components/screens/filter/Filter";
import Search from "@/components/screens/search/Search";
import Sorting from "@/components/screens/sorting/Sorting";
import React from "react";

const SideBar = () => {
  return (
    <div className="h-full mb-6">
      <div className="bg-gradient-to-bl from-redDark to-redLight h-14 rounded-t-xl"></div>
      <div className="p-4 mt-2  border-r border-l border-grayDark ">
        <Search />
        <Sorting />
        <Filter />
      </div>
    </div>
  );
};

export default SideBar;
