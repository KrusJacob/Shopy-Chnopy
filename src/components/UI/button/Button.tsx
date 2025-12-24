import { TypeButtonProps } from "@/types/button.types";
import { TailSpin } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";
import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement, TypeButtonProps>(
  (
    {
      children,
      Icon,
      sizeIcon,
      style,
      className,
      isLoading,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        disabled={disabled || isLoading}
        ref={ref}
        {...rest}
        style={style}
        className={twMerge(
          styles.button,
          "bg-slate-50 disabled:bg-greenLight hover:bg-greenLight",
          className
        )}
      >
        {isLoading ? (
          <TailSpin height={24} radius={3} />
        ) : (
          <>
            {Icon && (
              <div>
                <Icon size={sizeIcon} />
              </div>
            )}
            {children}
          </>
        )}
        {/* {children} */}
      </button>
    );
  }
);

export default Button;
