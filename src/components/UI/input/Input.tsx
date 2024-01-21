import { twMerge } from "tailwind-merge";
import React, { forwardRef } from "react";
import styles from "./Input.module.scss";
import { TypeInputProps } from "@/types/input.types";

const Input = forwardRef<HTMLInputElement, TypeInputProps>(({ style, className, ...rest }, ref) => {
  return <input ref={ref} {...rest} style={style} className={twMerge(styles.input, className)} />;
});

export default Input;
