import { navPaths } from "@/services/navPaths";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default Header;
