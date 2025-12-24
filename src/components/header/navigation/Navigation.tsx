"use client";
import { navPaths } from "@/services/navPaths";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import Cart from "../Cart";
import { LogIn, LogOut } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "../Logo";
import { useAuthStore } from "@/store/auth/storeAuth";

const navItems = [
  { label: "Catalog", path: navPaths.CATALOG, disabled: false },
  { label: "Admin", path: navPaths.ADMIN, disabled: true },
];

const navSigninLink = {
  label: "Signin",
  path: navPaths.SIGNIN,
  disabled: false,
};
const navLogoutLink = {
  label: "Logout",
  path: navPaths.CATALOG,
  disabled: false,
};

const Navigation = () => {
  const [items, setItems] = useState(navItems);
  const [hydrated, setHydrated] = useState(false);
  const {
    token: isAuth,
    logout,
    role,
    getUserData,
  } = useAuthStore((state) => state);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuth) return;

    getUserData();
  }, [isAuth]);

  useEffect(() => {
    setItems((prev) =>
      prev.map((item) =>
        item.path === navPaths.ADMIN
          ? { ...item, disabled: role !== "admin" }
          : item
      )
    );
  }, [role]);

  return (
    <div className={styles.navigation}>
      <HamburgerMenu
        navItems={[
          ...items,
          isAuth
            ? { ...navLogoutLink, callback: () => logout() }
            : navSigninLink,
        ]}
      />

      <div className="md:flex hidden gap-8">
        <Logo />
        <nav className="flex gap-8">
          {items.map((item) => {
            if (!item.disabled)
              return (
                <Link
                  key={item.label}
                  className={styles.underline}
                  href={item.path}
                >
                  {item.label}
                </Link>
              );
          })}
        </nav>
      </div>

      <div className="items-center gap-8 ml-auto md:flex hidden">
        {isAuth && hydrated ? (
          <Link
            className={styles.underline}
            onClick={() => logout()}
            href={navPaths.CATALOG}
          >
            <span>Logout</span>
            <LogOut />
          </Link>
        ) : (
          <Link className={styles.underline} href={navPaths.SIGNIN}>
            <span>Signin</span>
            <LogIn />
          </Link>
        )}
      </div>
      <Cart />
    </div>
  );
};

export default Navigation;
