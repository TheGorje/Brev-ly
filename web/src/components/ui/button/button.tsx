import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Typography } from "@ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="bg-blue-base enabled:hover:bg-blue-dark flex h-12 cursor-pointer items-center justify-center gap-3 rounded-lg px-5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      <Typography variant="md" as="label" className="text-gray-100">
        {children}
      </Typography>
    </button>
  );
}
