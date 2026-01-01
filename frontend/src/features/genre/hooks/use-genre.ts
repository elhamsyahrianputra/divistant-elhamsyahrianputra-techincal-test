import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { GenreRequest } from "../schemas/genre.schema";
import { genreService } from "../services/genre.service";

export function useGenres() {
  return useQuery({
    queryKey: ["genre"],
    queryFn: genreService.getAll,
  });
}

export function useGenre(id: string) {
  return useQuery({
    queryKey: ["genre", id],
    queryFn: () => genreService.getById(id),
  });
}

export function useCreateGenre() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: genreService.create,
    onSuccess: (response) => {
      toast.success(response.message ?? "Genre created", {
        id: "create-genre",
      });
      queryClient.invalidateQueries({ queryKey: ["genre"] });
      router.push("/dashboard/genres");
    },
  });
}

export function useUpdateGenre(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GenreRequest) => genreService.update(id, request),
    onSuccess: (response) => {
      toast.success(response.message ?? "Genre updated", {
        id: "update-genre",
      });
      queryClient.invalidateQueries({ queryKey: ["genre", id] });
      queryClient.invalidateQueries({ queryKey: ["genre"] });
    },
  });
}

export function useDeleteGenre(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => genreService.delete(id),
    onSuccess: (response) => {
      toast.success(response.message ?? "Genre deleted", {
        id: "delete-genre",
      });
      queryClient.invalidateQueries({ queryKey: ["genre"] });
      router.push("/dashboard/genres");
    },
  });
}
