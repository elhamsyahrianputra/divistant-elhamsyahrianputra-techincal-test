"use client";

import { toast } from "sonner";
import { GenreFormFields } from "@/features/genre/components";
import { useCreateGenre } from "@/features/genre/hooks/use-genre";
import type { GenreRequest } from "@/features/genre/schemas/genre.schema";

export default function Page() {
  const { mutate: createGenre } = useCreateGenre();

  const handleCreate = (request: GenreRequest) => {
    toast.loading("Creating genre...", { id: "create-genre" });
    createGenre(request);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-9/12">
          <GenreFormFields genre={undefined} onSubmit={handleCreate} />
        </div>

        <div className="w-full lg:w-3/12">
          <div className="rounded-2xl border border-primary/30 border-dashed bg-primary-lighter/30 p-4 text-gray-700 text-sm">
            <p className="font-semibold text-primary">Tips</p>
            <ul className="mt-2 list-disc pl-4 text-gray-600">
              <li>Keep genre names concise and recognizable.</li>
              <li>Use the description to explain the mood or scope.</li>
              <li>Avoid duplicates; check existing genres first.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
