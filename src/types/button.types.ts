import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export interface IButtonProps {
  Icon?: LucideIcon;
  sizeIcon?: number;
  children: React.ReactNode;
  isLoading?: boolean;
}

export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  IButtonProps;
