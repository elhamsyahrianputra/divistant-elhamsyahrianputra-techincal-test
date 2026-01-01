"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { MultiSelect } from "@/core/components/ui/forms";
import type { Author } from "@/features/author/types/author.types";
import type { UpdateBookRequest } from "../schemas/book.schema";

interface AuthorsMultiSelectProps {
  control: Control<UpdateBookRequest>;
  authors: Author[] | undefined;
  errors: FieldErrors<UpdateBookRequest>;
}

export function AuthorsMultiSelect({
  control,
  authors,
  errors,
}: AuthorsMultiSelectProps) {
  return (
    <Controller
      control={control}
      name="authors"
      render={({ field }) => (
        <MultiSelect
          errorMessage={errors.authors?.message}
          label="Authors"
          labelKey="label"
          onChange={(selected) => {
            field.onChange(selected.map((item) => item.value as string));
          }}
          options={
            authors?.map((author) => ({
              value: author.id,
              label: author.name,
            })) ?? []
          }
          placeholder="Select authors..."
          searchPlaceholder="Search authors..."
          selected={
            field.value
              ?.map((id) => {
                const author = authors?.find((a) => a.id === id);
                if (!author) return null;
                return {
                  value: author.id,
                  label: author.name,
                };
              })
              .filter(
                (item): item is { value: string; label: string } =>
                  item !== null,
              ) ?? []
          }
          valueKey="value"
        />
      )}
    />
  );
}
