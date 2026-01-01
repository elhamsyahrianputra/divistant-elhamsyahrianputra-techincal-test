"use client";

import { AltArrowDown, Magnifer } from "@solar-icons/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/core/utils/cn";

type SelectOption = Record<string, string | number>;

interface MultiSelectProps<T extends SelectOption> {
  label: string;
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  valueKey?: keyof T;
  labelKey?: keyof T;
  disabled?: boolean;
  errorMessage?: string;
}

export function MultiSelect<T extends SelectOption>({
  label,
  options,
  selected,
  onChange,
  placeholder = "",
  searchPlaceholder = "Search...",
  valueKey = "id" as keyof T,
  labelKey = "name" as keyof T,
  disabled = false,
  errorMessage,
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    String(option[labelKey]).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleOption = (option: T) => {
    const isSelected = selected.some(
      (item) => item[valueKey] === option[valueKey],
    );
    if (isSelected) {
      onChange(selected.filter((item) => item[valueKey] !== option[valueKey]));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeSelected = (value: string | number) => {
    onChange(selected.filter((item) => item[valueKey] !== value));
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        {/* Trigger Button */}
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            "peer relative min-h-14 w-full rounded-lg bg-white px-3.5 py-4 text-left transition-colors",
            disabled && "cursor-not-allowed opacity-50",
          )}
          disabled={disabled}
          id="multiselect-button"
          onClick={handleToggleDropdown}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          type="button"
        >
          {/* Selected Items Container */}
          <div className="flex flex-wrap items-center gap-2">
            {selected.length > 0 ? (
              selected.map((item, idx) => (
                <div
                  className="inline-flex cursor-default items-center gap-1 rounded-md bg-primary-lighter px-2 py-1 font-medium text-primary text-sm"
                  key={item[valueKey] !== undefined ? String(item[valueKey]) : `idx-${idx}`}
                >
                  <span>{String(item[labelKey])}</span>
                  <span
                    aria-label={`Remove ${item[labelKey]}`}
                    className="ml-1 inline-flex cursor-pointer items-center justify-center rounded p-0 text-lg text-primary leading-none transition-colors duration-150 ease-in-out hover:text-primary-light focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeSelected(item[valueKey]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        removeSelected(item[valueKey]);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    ×
                  </span>
                </div>
              ))
            ) : placeholder ? (
              <span className="text-gray-400 text-sm">{placeholder}</span>
            ) : null}
          </div>

          {/* Dropdown Indicator */}
          <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 flex items-center">
            <AltArrowDown
              className={cn(
                "h-5 w-5 text-gray-600 transition-transform duration-300 ease-in-out",
                isOpen && "-rotate-90",
              )}
            />
          </div>
        </button>

        {/* Label */}
        <label
          className={cn(
            "-translate-y-2 absolute top-0 left-0 translate-x-3.5 font-semibold text-xs",
            "peer-focus:text-gray-800",
            "transition-colors duration-150 ease-[0.4,0,0.2,1]",
            errorMessage ? "text-error!" : "text-gray-600",
          )}
          htmlFor="multiselect-button"
        >
          {label}
        </label>

        {/* Border */}
        <fieldset
          className={cn(
            "-top-2 pointer-events-none absolute inset-x-0 bottom-0 rounded-lg border px-2",
            "peer-hover:border-gray-800",
            "transition-[border-color] duration-150 ease-[0.4,0,0.2,1]",
            isOpen && "border-2 border-gray-800",
            errorMessage ? "border-error!" : "border-gray-600/20",
          )}
        >
          <legend className="px-1.5 text-xs opacity-0">{label}</legend>
        </fieldset>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div>
          <p className="mt-1.5 ml-2.5 text-error text-xs">{errorMessage}</p>
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="relative z-10 mt-2">
          <div className="absolute right-0 left-0 max-h-80 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
            {/* Search Input Section */}
            <div className="border-gray-200 border-b p-3">
              <div className="relative">
                <input
                  className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-9 text-sm focus:border-gray-800 focus:outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                />
                <Magnifer
                  aria-hidden
                  className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
                />
              </div>
            </div>

            {/* Options List */}
            <ul className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selected.some(
                    (item) => item[valueKey] === option[valueKey],
                  );
                  return (
                    <li key={String(option[valueKey])}>
                      <button
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        onClick={() => {
                          toggleOption(option);
                        }}
                        role="option"
                        type="button"
                      >
                        <div
                          aria-hidden
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-gray-300",
                          )}
                        >
                          {isSelected && (
                            <svg
                              aria-hidden="true"
                              className="h-3 w-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <title>Selected</title>
                              <path
                                d="M5 13l4 4L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-800 text-sm">
                          {String(option[labelKey])}
                        </span>
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-8 text-center text-gray-500 text-sm">
                  No results found
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
