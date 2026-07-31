import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="bg-blue-base enabled:hover:bg-blue-dark flex h-12 cursor-pointer items-center justify-center gap-3 rounded-lg px-5 text-white transition-colors ease-out disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
