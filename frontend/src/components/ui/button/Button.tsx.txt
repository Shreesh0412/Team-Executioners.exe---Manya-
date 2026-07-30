import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./buttonVariants";
import { cn } from "../../../lib/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}