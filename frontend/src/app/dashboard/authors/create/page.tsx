"use client";

import { toast } from "sonner";
import { AuthorFormFields } from "@/features/author/components";
import { useCreateAuthor } from "@/features/author/hooks/use-author";
import type { AuthorRequest } from "@/features/author/schemas/author.schema";

export default function Page() {
  const { mutate: createAuthor } = useCreateAuthor();

  const handleCreate = (request: AuthorRequest) => {
    toast.loading("Creating author...", { id: "create-author" });
    createAuthor(request);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-3/12">
          <div className="sticky top-20">
            <span className="mb-2 block font-semibold text-gray-800 text-xs">
              Author Photo
            </span>
            <div className="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-300 border-dashed bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100 transition-colors">
              <div className="flex h-full flex-col items-center justify-center gap-y-3 px-4 text-center">
                <span className="px-4 text-center font-bold text-gray-600 text-xl leading-tight">
                  Save the author first to upload the photo.
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-500 text-xs">Recommended: 400x400px</p>
          </div>
        </div>

        <div className="w-full lg:w-9/12">
          <AuthorFormFields author={undefined} onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
}
