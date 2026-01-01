import { Magnifer } from "@solar-icons/react";

export function Search() {
  return (
    <label className="flex items-center">
      <Magnifer
        className="pointer-events-none absolute translate-x-4 text-gray-600"
        size={20}
      />
      <input
        className="w-full rounded-lg px-12 py-4 outline outline-gray-600/20 hover:outline-gray-800 focus:outline-2 focus:outline-gray-800"
        placeholder="Search..."
        type="text"
      />
    </label>
  );
}
