import type { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold shadow transition-colors duration-250 ease-[0.4,0,0.2,1] hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-60",

  variants: {
    // Varian Warna
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      info: "bg-info text-white",
      success: "bg-success text-white",
      warning: "bg-warning text-white",
      error: "bg-error text-white",
      dark: "bg-gray-800 text-white",
      light: "bg-gray-100 text-gray-800",
    },
    size: {
      sm: "h-7.5 px-2 py-1 text-[13px]",
      md: "h-9 px-3 py-1.5 text-sm",
      lg: "h-12 px-5 py-2 text-[15px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && (
        <svg
          // Ukuran icon loading disesuaikan agar proporsional
          className="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Loading...</title>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

// Export variants untuk keperluan testing atau penggunaan di komponen lain
export { buttonVariants };
