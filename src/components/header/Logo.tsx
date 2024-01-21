import { navPaths } from "@/services/navPaths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={navPaths.HOME}>
      <Image alt="logo" width={300} height={50} priority src="/logo.png" />
    </Link>
  );
};

export default Logo;
