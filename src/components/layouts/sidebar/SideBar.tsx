import Filter from "@/components/entities/filter/Filter";
import React from "react";

const SideBar = () => {
  return (
    <div className="h-full mb-6">
      <div className="bg-gradient-to-bl from-primaryDark to-primaryLight h-14 rounded-t-xl"></div>
      <Filter />
    </div>
  );
};

export default SideBar;
