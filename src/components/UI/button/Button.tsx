import { TypeButtonProps } from "@/types/button.types";
import { cnTw } from "@/utils/cn";
import cn from "classnames";
import { twMerge } from "tailwind-merge";
import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement, TypeButtonProps>(
  ({ children, Icon, sizeIcon, style, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        style={style}
        className={twMerge(styles.button, "bg-slate-50 disabled:bg-greenLight", className)}
      >
        {Icon && (
          <div>
            <Icon size={sizeIcon} />
          </div>
        )}

        {children}
      </button>
    );
  }
);

export default Button;
