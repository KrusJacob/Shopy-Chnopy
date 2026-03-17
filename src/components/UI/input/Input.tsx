import { twMerge } from "tailwind-merge";
import React, { forwardRef } from "react";
// import styles from "./Input.module.css";
import { TypeInputProps } from "@/types/input.types";

const Input = forwardRef<HTMLInputElement, TypeInputProps>(
  ({ style, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        style={style}
        className={twMerge(
          "px-2 py-1 border border-black/50 shadow-xs rounded outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1",
          className
        )}
      />
    );
  }
);

export default Input;
