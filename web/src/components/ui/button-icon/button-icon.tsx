import type { ButtonHTMLAttributes } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export function ButtonIcon({ icon, disabled, ...props }: ButtonIconProps) {
  return (
    <button
      disabled={disabled}
      className="hover:border-blue-base flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent bg-gray-200 transition-colors duration-150"
      {...props}
    >
      {icon}
    </button>
  );
}
