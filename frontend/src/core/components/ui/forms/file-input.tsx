"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={`
            block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-50 file:text-gray-700
            hover:file:bg-gray-100
            focus:outline-none
            ${errorMessage ? "border-error" : ""}
            ${className}
          `}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1.5 ml-2.5 text-error text-xs">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
