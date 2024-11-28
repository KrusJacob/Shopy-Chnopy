"use client";
import { navPaths } from "@/services/navPaths";
import { Menu, XSquare } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type NavigationProps = {
  label: string;
  path: string;
  disabled: boolean;
  callback?: () => void;
};

const HamburgerMenu = ({ navItems }: { navItems: NavigationProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden block">
      <Menu onClick={() => setIsOpen(!isOpen)} size={46} />

      {isOpen && (
        <div className="z-50 fixed sm:w-1/2 w-2/3 px-8 py-4 left-0 top-0 bg-black bg-opacity-80 h-full">
          <XSquare className="mr-auto" onClick={() => setIsOpen(!isOpen)} size={46} />
          <nav className="flex flex-col text-center gap-6 justify-center  mt-10">
            <Link onClick={() => setIsOpen(!isOpen)} className="text-3xl" href={navPaths.HOME}>
              Home
            </Link>
            {navItems.map((item) => {
              if (!item.disabled)
                return (
                  <Link
                    onClick={() => {
                      setIsOpen(!isOpen);
                      item.callback && item.callback();
                    }}
                    className="text-3xl"
                    key={item.label}
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
