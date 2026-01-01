"use client";

import { useState } from "react";

interface SidebarDropdownProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export default function SidebarDropdown({
  children,
  title,
  icon,
}: SidebarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="flex flex-col">
      <button
        aria-expanded={isOpen}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-1 pr-2 pl-3 font-medium text-[14px] text-gray-600 hover:bg-gray-500/[0.08] ${isOpen ? "bg-gray-500/[0.08]" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {/* <Icon
          className={isOpen ? "grayscale-50" : "grayscale-[0.85]"}
          name={icon}
        /> */}
        <span className="flex flex-1 justify-start">{title}</span>
        <div>
          <svg
            aria-hidden="true"
            className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
            height="16px"
            role="img"
            viewBox="0 0 24 24"
            width="16px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <ul
        aria-hidden={!isOpen}
        className={`relative flex flex-col gap-1 overflow-hidden pl-9 transition-all duration-300 ease-in-out before:absolute before:left-[13.5px] before:h-[calc(100%-30px)] before:w-3 before:border-gray-300 before:border-r-2 before:content-[''] ${isOpen ? "max-h-fit pt-1" : "max-h-0"}`}
      >
        {children}
      </ul>
    </li>
  );
}
