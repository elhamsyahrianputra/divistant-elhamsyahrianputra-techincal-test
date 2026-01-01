"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { MultiSelect } from "@/core/components/ui/forms";
import type { Genre } from "@/features/genre/types/genre.types";
import type { BookRequest } from "../schemas/book.schema";

interface GenresMultiSelectProps {
  control: Control<BookRequest>;
  genres: Genre[] | undefined;
  errors: FieldErrors<BookRequest>;
}

export function GenresMultiSelect({
  control,
  genres,
  errors,
}: GenresMultiSelectProps) {
  return (
    <Controller
      control={control}
      name="genres"
      render={({ field }) => (
        <MultiSelect
          errorMessage={errors.genres?.message}
          label="Genres"
          labelKey="label"
          onChange={(selected) => {
            field.onChange(selected.map((item) => item.value as string));
          }}
          options={
            genres?.map((genre) => ({
              value: genre.id,
              label: genre.name,
            })) ?? []
          }
          placeholder="Select genres..."
          searchPlaceholder="Search genres..."
          selected={
            field.value
              ?.map((id) => {
                const genre = genres?.find((g) => g.id === id);
                if (!genre) return null;
                return {
                  value: genre.id,
                  label: genre.name,
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
