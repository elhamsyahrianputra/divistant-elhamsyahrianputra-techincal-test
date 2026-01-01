import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ApiResponseSuccess } from "@/core/types/api.types";
import type { QueryParams } from "@/core/types/pagination.types";
import type { BookRequest } from "../schemas/book.schema";
import { bookService } from "../services/book.services";
import type { Book } from "../types/book.types";

export function useBooks(params?: QueryParams) {
  return useQuery<ApiResponseSuccess<Book[]>>({
    queryKey: ["book", params],
    queryFn: () => bookService.getAll(params),
  });
}

export function useBook(id: string) {
  return useQuery<ApiResponseSuccess<Book>>({
    queryKey: ["book", id],
    queryFn: () => bookService.getById(id as string),
  });
}

export function useBookBySlug(slug: string) {
  return useQuery<ApiResponseSuccess<Book>>({
    queryKey: ["book", slug],
    queryFn: () => bookService.getBySlug(slug as string),
  });
}

export function useCreateBook() {
  const router = useRouter();
  return useMutation({
    mutationFn: bookService.create,
    onSuccess: (response) => {
      toast.success(response.message, { id: "create-book" });
      router.push("/dashboard/books");
    },
  });
}

export function useUpdateBook(id: string) {
  return useMutation({
    mutationFn: (data: BookRequest) => {
      return bookService.update(id, data);
    },
    onSuccess: (response) => {
      toast.success(response.message, { id: "update-book" });
    },
  });
}

export function useDeleteBook(id: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return bookService.delete(id);
    },
    onSuccess: (response) => {
      toast.success(response.message, { id: "delete-book" });
      router.push("/dashboard/books");
    },
  });
}

export function useUploadCover(id?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      if (!id) throw new Error("Missing book id for cover upload");
      return bookService.uploadCover(id, file);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["book", id] });
      }
    },
  });
}
