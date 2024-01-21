import { twMerge, ClassNameValue } from "tailwind-merge";
import cn from "classnames";

export function cnTw(...inputs: ClassNameValue[]) {
  return twMerge(cn(inputs));
}
