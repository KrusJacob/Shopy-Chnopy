import Button from "@/components/UI/button/Button";
import { Wallet2 } from "lucide-react";
import React, { useState } from "react";

const CartHeader = ({
  totalPrice,
  setShowModal,
  productsSelected,
  productsLength,
}: {
  totalPrice: number;
  setShowModal: (show: boolean) => void;
  productsSelected: number;
  productsLength: number;
}) => {
  return (
    <div className="text-center  flex justify-between md:gap-8 gap-2 items-center p-2 border-b-2 border-b-black">
      <span className="opacity-60 text-xs md:text-sm">
        Selected {productsSelected} of {productsLength}
      </span>
      <p className="md:text-2xl text-lg ">
        Total:{" "}
        <span className="font-medium  mr-2 text-greenDark ">{totalPrice}</span>$
      </p>
      <Button
        Icon={Wallet2}
        onClick={() => setShowModal(true)}
        className="md:text-xl text-sm disabled:opacity-50"
        disabled={!totalPrice}
      >
        Payment
      </Button>
    </div>
  );
};

export default CartHeader;
