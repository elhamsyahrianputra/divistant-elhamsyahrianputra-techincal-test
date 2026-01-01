import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { Book } from "@/features/book/types/book.types";
import type { AuthorRequest } from "../schemas/author.schema";
import { authorService } from "../services/author.service";
import type { Author } from "../types/author.types";

export function useAuthors(params?: QueryParams) {
  return useQuery<ApiResponseSuccess<Author[]>>({
    queryKey: ["author", params],
    queryFn: () => authorService.getAll(params),
  });
}

export function useAuthor(id: string) {
  return useQuery<ApiResponseSuccess<Author>>({
    queryKey: ["author", id],
    queryFn: () => authorService.getById(id),
  });
}

export function useAuthorBooks(
  authorId: string,
  params?: QueryParams,
  options?: any,
) {
  return useQuery<ApiResponseSuccess<Book[]>>({
    queryKey: ["author", authorId, "books", params],
    queryFn: () => authorService.getBooks(authorId, params),
    ...options,
  });
}

export function useCreateAuthor() {
  const router = useRouter();
  return useMutation({
    mutationFn: authorService.create,
    onSuccess: (response) => {
      toast.success(response.message, { id: "create-author" });
      router.push("/dashboard/authors");
    },
  });
}

export function useUpdateAuthor(id: string) {
  return useMutation({
    mutationFn: (data: AuthorRequest) => {
      return authorService.update(id, data);
    },
    onSuccess: (response) => {
      toast.success(response.message, { id: "update-author" });
    },
  });
}

export function useDeleteAuthor(id: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return authorService.delete(id);
    },
    onSuccess: (response) => {
      toast.success(response.message, { id: "delete-author" });
      router.push("/dashboard/authors");
    },
  });
}

export function useUploadAuthorImage(id?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      if (!id) throw new Error("Missing author id for image upload");
      return authorService.uploadImage(id, file);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["author", id] });
      }
    },
  });
}
