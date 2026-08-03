import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outlined";
}

export function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex h-12 items-center justify-center gap-3 rounded-lg px-5 transition-all ease-out disabled:cursor-not-allowed",
        {
          "bg-blue-base enabled:hover:bg-blue-dark cursor-pointer text-white disabled:opacity-50":
            variant === "default",

          "cursor-pointer border bg-transparent opacity-50 hover:opacity-100":
            variant === "outlined",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
