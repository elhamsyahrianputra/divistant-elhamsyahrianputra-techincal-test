"use client";

import Image from "next/image";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import { useSidebarStore } from "@/core/store/use-sidebar.store";
import { cn } from "@/core/utils/cn";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const sidebarIsOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <>
      <button
        className={cn(
          "fixed z-2000 h-screen w-screen bg-gray-800/48 xl:hidden",
          sidebarIsOpen ? "block" : "hidden",
        )}
        onClick={toggleSidebar}
        type="button"
      ></button>

      <aside
        aria-hidden={!sidebarIsOpen}
        className={cn(
          "fixed z-2000 block h-screen border-r border-r-gray-500/12 bg-white xl:translate-x-0",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.6,1)]",
          sidebarIsOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
      >
        <div className="pt-5 pb-2 pl-7">
          <Link href="/">
            <Image
              alt="Logo"
              height={40}
              src="/img/logo/logo-blue.svg"
              width={40}
            />
          </Link>
        </div>
        <div className="relative z-1000 flex h-full w-72 flex-col border-r-gray-500/12 xl:w-75">
          <nav className="flex-1">
            <SimpleBar autoHide={true} className="max-h-[calc(100vh-70px)]">
              <ul className="flex flex-col gap-1 px-4">{children}</ul>
            </SimpleBar>
          </nav>
        </div>
      </aside>
    </>
  );
}
