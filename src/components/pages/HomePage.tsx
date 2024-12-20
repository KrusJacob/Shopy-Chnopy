"use client";
import Button from "@/components/UI/button/Button";
import { navPaths } from "@/services/navPaths";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const listItem = [
  {
    label: "Fast",
  },
  {
    label: "Сonvenient",
  },
  {
    label: "High-quality",
  },
];

const HomePage = () => {
  return (
    <div className="mt-14 px-4 ">
      <div className="">
        <motion.h1
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, type: "spring" }}
          className="lg:text-8xl sm:text-5xl text-3xl font-bold"
        >
          Shopy{" "}
          <span className="text-white px-4 py-2 rounded-lg bg-primaryLight">
            Chnopy
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, type: "spring", delay: 0.5 }}
          className="lg:text-4xl sm:text-3xl text-xl sm:mt-8 mt-4 border-b-2 py-1 border-black inline-block"
        >
          Best Online shop
        </motion.p>
      </div>
      <div className="mt-8 ml-auto lg:w-1/2 sm:w-3/5 w-full">
        <ul className="lg:text-3xl sm:text-2xl text-xl list-disc grid gap-1 ml-5 ">
          {listItem.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.25 + 0.25 * i }}
            >
              {item.label}
            </motion.li>
          ))}
        </ul>
        <motion.p
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="lg:text-xl sm:text-lg text-md mt-4"
        >
          We offer a wide range of products, from fashionable clothing and
          accessories to unique home items. At Shopy Chnopy, we strive to
          provide you with the best products at affordable prices, with fast
          delivery and excellent customer service. Discover the world of
          shopping with us and enjoy every purchase!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          <Link href={navPaths.CATALOG}>
            <Button
              className="mt-8 sm:text-xl flex items-center text-md"
              Icon={MoveRight}
              sizeIcon={30}
            >
              Go to Catalog
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
