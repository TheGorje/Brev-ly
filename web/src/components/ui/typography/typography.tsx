import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import "./typography.css";

const variants = {
  xl: "typography-xl",
  lg: "typography-lg",
  md: "typography-md",
  sm: "typography-sm",
  xs: "typography-xs",
} as const;

type TypographyVariant = keyof typeof variants;

interface TypographyProps<T extends ElementType> {
  variant: TypographyVariant;
  as?: T;
  children: ReactNode;
  className?: string;
}

export function Typography<T extends ElementType = "span">({
  variant,
  as,
  children,
  className,
  ...props
}: TypographyProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as || "span";

  return (
    <Component className={`${variants[variant]} ${className ?? ""}`} {...props}>
      {children}
    </Component>
  );
}
