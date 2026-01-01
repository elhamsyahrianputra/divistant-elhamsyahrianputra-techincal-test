"use client";

import type { Icon } from "@solar-icons/react/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: Icon;
  title: string;
  exact?: boolean;
}

export default function SidebarItem({
  href,
  icon,
  title,
  exact = false,
}: NavItemProps) {
  const pathname = usePathname() || "/";

  const normalize = (p: string) => p.replace(/\/+$/, "") || "/";
  const normalizedPathname = normalize(pathname);
  const normalizedHref = normalize(href);

  // Check if current path matches or is a child route of href
  const isActive = exact
    ? normalizedPathname === normalizedHref
    : normalizedPathname === normalizedHref ||
      (normalizedHref !== "/" &&
        normalizedPathname.startsWith(`${normalizedHref}/`));

  const baseClass =
    "flex min-h-11 items-center gap-3 rounded-lg px-1 pr-2 pl-3 font-medium text-[14px] hover:bg-gray-500/[0.08]";
  const activeClass = isActive
    ? "bg-primary/[0.08] text-primary font-semibold hover:bg-primary/[0.16]"
    : "text-gray-600";

  const IconComponent = icon;

  return (
    <li>
      <Link className={`${baseClass} ${activeClass}`} href={href}>
        <IconComponent
          className={
            isActive ? "text-primary-600 grayscale-0" : "grayscale-[0.85]"
          }
          size={24}
          weight="BoldDuotone"
        />
        <span>{title}</span>
      </Link>
    </li>
  );
}
