import Filter from "@/components/entities/filter/Filter";
import Search from "@/components/entities/filter/search/Search";
import Sorting from "@/components/entities/filter/sorting/Sorting";
import React from "react";

const SideBar = () => {
  return (
    <div className="h-full mb-6">
      <div className="bg-gradient-to-bl from-redDark to-redLight h-14 rounded-t-xl"></div>
      {/* <div className="p-2 mt-2 pb-4  border-r border-l border-b border-grayDark  ">
        <Search />
        <Sorting />
        <Filter />
      </div> */}
      <Filter />
    </div>
  );
};

export default SideBar;
