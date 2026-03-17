import React from "react";

import Navigation from "./navigation/Navigation";

const Header = () => {
  return (
    <header className="flex items-center gap-10 px-8 py-4 bg-primaryLight text-white">
      <Navigation />
    </header>
  );
};

export default Header;
