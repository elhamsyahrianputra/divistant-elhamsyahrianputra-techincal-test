"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input, MultiSelect, Textarea } from "@/core/components/ui/forms";
import dayjs from "@/core/lib/dayjs";
import type { Author } from "@/features/author/types/author.types";
import type { Genre } from "@/features/genre/types/genre.types";
import { type BookRequest, bookSchema } from "../schemas/book.schema";
import type { Book } from "../types/book.types";

interface BookFormFieldsProps {
  book: Book | undefined;
  authors: Author[] | undefined;
  genres: Genre[] | undefined;
  onSubmit: (data: BookRequest) => void;
}

export function BookFormFields({
  book,
  authors,
  genres,
  onSubmit,
}: BookFormFieldsProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookRequest>({
    resolver: zodResolver(bookSchema),
    values: book
      ? {
          ...book,
          publishedAt:
            book.publishedAt && dayjs(book.publishedAt).isValid()
              ? dayjs(book.publishedAt).format("YYYY-MM-DD")
              : undefined,
          authors: book.authors.map((author) => author.id),
          genres: book.genres.map((genre) => genre.id),
        }
      : undefined,
  });

  const handleCancelOrReset = () => {
    if (book) {
      reset();
    } else {
      router.push("/dashboard/books");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-6">
        {/* Title */}
        <Input
          label="Title*"
          {...register("title")}
          errorMessage={errors.title?.message}
        />

        {/* ISBN & Pages */}
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Input
            label="ISBN"
            {...register("isbn", {
              setValueAs: (v: string) => (v === "" ? undefined : v),
            })}
            errorMessage={errors.isbn?.message}
          />
          <Input
            label="Pages"
            type="number"
            {...register("pages", {
              setValueAs: (v: string) => {
                if (v === "" || v === null || v === undefined) return undefined;
                const num = Number(v);
                return isNaN(num) ? undefined : num;
              },
            })}
            errorMessage={errors.pages?.message}
          />
        </div>

        {/* Publisher & Published Date */}
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Input
            label="Publisher"
            {...register("publisher", {
              setValueAs: (v: string) => (v === "" ? undefined : v),
            })}
            errorMessage={errors.publisher?.message}
          />
          <Input
            label="Date Published"
            type="date"
            {...register("publishedAt", {
              setValueAs: (v: string) => (v === "" ? undefined : v),
            })}
            errorMessage={errors.publishedAt?.message}
          />
        </div>

        {/* Authors Multi-Select */}
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
                    if (!author) return [null];
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

        {/* Genres Multi-Select */}
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

        {/* Description */}
        <Textarea
          label="Description"
          {...register("description", {
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
          errorMessage={errors.description?.message}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={handleCancelOrReset} type="button" variant="light">
            {book ? "Reset" : "Cancel"}
          </Button>
          <Button type="submit" variant="dark">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
