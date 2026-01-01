"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  errorMessage?: string;
  onFileChange?: (file: File | null) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, errorMessage, onFileChange, className = "", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onFileChange?.(file);
    };

    return (
      <div className="flex flex-col gap-y-1.5">
        {label && (
          <label className="font-medium text-gray-700 text-sm">{label}</label>
        )}
        <input
          accept="image/*"
          className={`block w-full text-gray-500 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:font-semibold file:text-gray-700 file:text-sm hover:file:bg-gray-100 focus:outline-none ${errorMessage ? "border-error" : ""}
            ${className}
          `}
          onChange={handleChange}
          ref={ref}
          type="file"
          {...props}
        />
        {errorMessage && (
          <p className="mt-1.5 ml-2.5 text-error text-xs">{errorMessage}</p>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
