interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({ children, disabled, isLoading }: ButtonProps) {
  return (
    <button
      className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 font-bold text-sm text-white transition-opacity duration-250 ease-[0.4,0,0.2,1] hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled || isLoading}
      type="submit"
    >
      {isLoading && (
        <svg
          className="h-5 w-5 animate-spin"
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
