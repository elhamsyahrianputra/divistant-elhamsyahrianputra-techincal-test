import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold text-[11px] uppercase tracking-wide transition-colors duration-200",
  variants: {
    variant: {
      solid: "",
      soft: "",
      outline: "bg-transparent",
    },
    theme: {
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      error: "",
      gray: "",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      theme: "primary",
      class: "border-transparent bg-primary text-white",
    },
    {
      variant: "solid",
      theme: "secondary",
      class: "border-transparent bg-secondary text-white",
    },
    {
      variant: "solid",
      theme: "success",
      class: "border-transparent bg-success text-white",
    },
    {
      variant: "solid",
      theme: "warning",
      class: "border-transparent bg-warning text-gray-900",
    },
    {
      variant: "solid",
      theme: "error",
      class: "border-transparent bg-error text-white",
    },
    {
      variant: "solid",
      theme: "gray",
      class: "border-transparent bg-gray-200 text-gray-800",
    },

    {
      variant: "soft",
      theme: "primary",
      class: "border-transparent bg-primary-lighter text-primary",
    },
    {
      variant: "soft",
      theme: "secondary",
      class: "border-transparent bg-secondary/10 text-secondary",
    },
    {
      variant: "soft",
      theme: "success",
      class: "border-transparent bg-success/10 text-success",
    },
    {
      variant: "soft",
      theme: "warning",
      class: "border-transparent bg-warning/20 text-warning",
    },
    {
      variant: "soft",
      theme: "error",
      class: "border-transparent bg-error/10 text-error",
    },
    {
      variant: "soft",
      theme: "gray",
      class: "border-transparent bg-gray-100 text-gray-700",
    },

    {
      variant: "outline",
      theme: "primary",
      class: "border-primary text-primary",
    },
    {
      variant: "outline",
      theme: "secondary",
      class: "border-secondary text-secondary",
    },
    {
      variant: "outline",
      theme: "success",
      class: "border-success text-success",
    },
    {
      variant: "outline",
      theme: "warning",
      class: "border-warning text-warning",
    },
    { variant: "outline", theme: "error", class: "border-error text-error" },
    {
      variant: "outline",
      theme: "gray",
      class: "border-gray-300 text-gray-700",
    },
  ],
  defaultVariants: {
    variant: "soft",
    theme: "primary",
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, theme, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, theme, className })} {...props} />
  );
}

export { badgeVariants };
