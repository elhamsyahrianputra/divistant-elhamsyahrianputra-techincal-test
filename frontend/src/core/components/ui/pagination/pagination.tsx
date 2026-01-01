"use client";

import { DoubleAltArrowLeft, DoubleAltArrowRight } from "@solar-icons/react";
import type { PaginationMeta } from "@/core/types/pagination.types";
import { cn } from "@/core/utils/cn";
import { Button } from "../button";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  if (!meta) return null;

  const { page, total_pages, total_items, limit } = meta;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < total_pages;

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(total_pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < total_pages - 1) {
      rangeWithDots.push("...", total_pages);
    } else if (total_pages > 1) {
      rangeWithDots.push(total_pages);
    }

    return rangeWithDots;
  };

  if (total_pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="transition-all duration-200"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
        size="sm"
        type="button"
        variant="light"
      >
        <DoubleAltArrowLeft size={16} weight="BoldDuotone" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, idx) =>
          pageNum === "..." ? (
            <span className="px-2 text-gray-500" key={`dots-${idx}`}>
              ...
            </span>
          ) : (
            <Button
              className={cn(
                "min-w-8 transition-all duration-200",
                pageNum === page
                  ? "bg-primary text-white"
                  : "bg-transparent text-gray-700 shadow-none hover:bg-gray-100",
              )}
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              size="sm"
              type="button"
            >
              {pageNum}
            </Button>
          ),
        )}
      </div>

      <Button
        className="transition-all duration-200"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        size="sm"
        type="button"
        variant="light"
      >
        Next
        <DoubleAltArrowRight size={16} weight="BoldDuotone" />
      </Button>
    </div>
  );
}
