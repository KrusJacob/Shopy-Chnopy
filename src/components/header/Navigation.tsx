"use client";
import { navPaths } from "@/services/navPaths";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import Cart from "./Cart";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

import HamburgerMenu from "./HamburgerMenu";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import Logo from "./Logo";

const navItems = [
  { label: "Catalog", path: navPaths.CATALOG, disabled: false },
  { label: "Admin", path: navPaths.ADMIN, disabled: true },
];

const Navigation = () => {
  const session = useSession();

  useEffect(() => {
    if (session.data && +session.data?.user.id === 1) {
      navItems.find((item) => item.path === navPaths.ADMIN)!.disabled = false;
    }
  }, [session]);

  return (
    <div className={styles.navigation}>
      <HamburgerMenu navItems={navItems} />

      <div className="md:flex hidden gap-8">
        <Logo />
        <nav className="flex gap-8">
          {navItems.map((item) => {
            if (!item.disabled)
              return (
                <Link key={item.label} className={styles.underline} href={item.path}>
                  {item.label}
                </Link>
              );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-8 ml-auto">
        {session.data ? (
          <Link
            className={styles.underline}
            onClick={() => signOut().then((a) => useToast.logOff())}
            href={navPaths.CATALOG}
          >
            <span>Logout</span>
            <LogOut />
          </Link>
        ) : (
          <Link className={styles.underline} href={navPaths.SIGNIN}>
            <span> Signin</span>
            <LogIn />
          </Link>
        )}
        <Cart />
      </div>
    </div>
  );
};

export default Navigation;
