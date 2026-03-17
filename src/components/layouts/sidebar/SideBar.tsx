import Filter from "@/components/entities/filter/Filter";
import React from "react";

const SideBar = () => {
  return (
    <div className="mb-6  h-min bg-white/50 rounded-xl">
      <div className="bg-linear-to-bl from-primaryDark to-primaryLight flex items-center px-4 h-14 rounded-t-xl">
        <h4 className="text-3xl text-white font-bold">Filters</h4>
      </div>
      <Filter />
    </div>
  );
};

export default SideBar;
