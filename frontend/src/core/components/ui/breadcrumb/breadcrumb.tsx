"use client";

import { AltArrowLeft } from "@solar-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

export function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();

  // Split path and filter empty
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const crumbs = segments.map((seg, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}`;
    // Capitalize segment (replace -/_) for display
    const label = seg
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  // Back button: go to previous segment if exists
  const handleBack = () => {
    if (crumbs.length > 1) {
      router.push(crumbs[crumbs.length - 2].href);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mb-10 flex flex-col gap-y-4">
      {crumbs.length > 1 && (
        <button
          className="group -ml-4.25 flex cursor-pointer items-center"
          onClick={handleBack}
          type="button"
        >
          <AltArrowLeft
            className="transition-colors duration-200 ease-in-out group-hover:text-gray-600"
            size={16}
          />
          <span className="font-bold text-2xl transition-colors duration-200 ease-in-out group-hover:text-gray-600">
            Back
          </span>
        </button>
      )}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-sm">
        <ol className="flex items-center gap-x-4">
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb.href}>
              {index !== 0 && (
                <li>
                  <span className="block size-1 rounded-full bg-gray-500"></span>
                </li>
              )}

              {index < crumbs.length - 1 ? (
                <Link className="text-gray-800 text-sm" href={crumb.href}>
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
}
