import Button from "@/components/UI/button/Button";
import { Wallet2 } from "lucide-react";
import React, { useState } from "react";

const CartTotalPrice = ({
  totalPrice,
  setShowModal,
}: {
  totalPrice: number;
  setShowModal: (show: boolean) => void;
}) => {
  return (
    <div className="text-center  flex justify-center md:gap-8 gap-4 items-center p-2 border-b-2 border-b-black">
      <p className="md:text-3xl text-2xl ">
        Total price:{" "}
        <span className="font-medium  mr-2 text-greenDark ">{totalPrice}</span>$
      </p>
      <Button
        Icon={Wallet2}
        onClick={() => setShowModal(true)}
        className="md:text-xl text-base disabled:opacity-50"
        disabled={!totalPrice}
      >
        Payment
      </Button>
    </div>
  );
};

export default CartTotalPrice;
