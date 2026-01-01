import { Magnifer } from "@solar-icons/react";
import { type ChangeEvent, useState } from "react";

interface SearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

export function Search({
  onSearch,
  placeholder = "Search...",
  debounce = 500,
}: SearchProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(newValue);
      }, debounce);

      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <label className="flex items-center">
      <Magnifer
        className="pointer-events-none absolute translate-x-4 text-gray-600"
        size={20}
      />
      <input
        className="w-full rounded-lg px-12 py-4 outline outline-gray-600/20 hover:outline-gray-800 focus:outline-2 focus:outline-gray-800"
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </label>
  );
}
