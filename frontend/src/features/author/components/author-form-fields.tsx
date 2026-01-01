"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/core/components/ui/button";
import { Input, Textarea } from "@/core/components/ui/forms";
import dayjs from "@/core/lib/dayjs";
import { type AuthorRequest, authorSchema } from "../schemas/author.schema";
import type { Author } from "../types/author.types";

interface AuthorFormFieldsProps {
  author?: Author;
  onSubmit: (data: AuthorRequest) => void;
}

export function AuthorFormFields({ author, onSubmit }: AuthorFormFieldsProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorRequest>({
    resolver: zodResolver(authorSchema),
    values: author
      ? {
          name: author.name,
          birthPlace: author.birthPlace ?? undefined,
          birthDate:
            author.birthDate && dayjs(author.birthDate).isValid()
              ? dayjs(author.birthDate).format("YYYY-MM-DD")
              : undefined,
          description: author.description ?? undefined,
          imageUrl: author.imageUrl ?? undefined,
        }
      : undefined,
  });

  const handleCancelOrReset = () => {
    if (author) {
      reset();
    } else {
      router.push("/dashboard/authors");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-6">
        <Input
          label="Name*"
          {...register("name")}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Birth Place"
          {...register("birthPlace", {
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
          errorMessage={errors.birthPlace?.message}
        />

        <Input
          label="Birth Date"
          type="date"
          {...register("birthDate", {
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
          errorMessage={errors.birthDate?.message}
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
            {author ? "Reset" : "Cancel"}
          </Button>
          <Button type="submit" variant="dark">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
