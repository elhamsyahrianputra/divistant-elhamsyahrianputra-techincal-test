"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input, Textarea } from "@/core/components/ui/forms";
import { type GenreRequest, genreSchema } from "../schemas/genre.schema";
import type { Genre } from "../types/genre.types";

interface GenreFormFieldsProps {
  genre?: Genre;
  onSubmit: (data: GenreRequest) => void;
}

export function GenreFormFields({ genre, onSubmit }: GenreFormFieldsProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenreRequest>({
    resolver: zodResolver(genreSchema),
    values: genre
      ? {
          name: genre.name,
          description: genre.description ?? undefined,
        }
      : undefined,
  });

  const handleCancelOrReset = () => {
    if (genre) {
      reset();
    } else {
      router.push("/dashboard/genres");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-6">
        <Input
          label="Genre Name*"
          {...register("name")}
          errorMessage={errors.name?.message}
        />

        <Textarea
          label="Description"
          {...register("description", {
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
          errorMessage={errors.description?.message}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={handleCancelOrReset} type="button" variant="light">
            {genre ? "Reset" : "Cancel"}
          </Button>
          <Button type="submit" variant="dark">
            Save Genre
          </Button>
        </div>
      </div>
    </form>
  );
}
